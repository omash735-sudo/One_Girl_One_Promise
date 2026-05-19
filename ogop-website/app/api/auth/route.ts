import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, generateToken, hashPassword } from '@/lib/auth'
import { sql } from '@/lib/db'

// Login
export async function POST(req: NextRequest) {
  try {
    const { username, password, action } = await req.json()
    
    // Login action
    if (action === 'login') {
      const user = await verifyAdminCredentials(username, password)
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
      
      const token = generateToken(user)
      
      return NextResponse.json({
        success: true,
        token,
        user: { username: user.username, role: user.role }
      })
    }
    
    // Setup first admin (only works if no admin exists)
    if (action === 'setup') {
      const existingAdmins = await sql`SELECT * FROM admin_users LIMIT 1`
      
      if (existingAdmins.length > 0) {
        return NextResponse.json(
          { error: 'Admin already exists' },
          { status: 403 }
        )
      }
      
      const hashedPassword = await hashPassword(password)
      await sql`
        INSERT INTO admin_users (username, password_hash)
        VALUES (${username}, ${hashedPassword})
      `
      
      return NextResponse.json({ success: true, message: 'Admin created' })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Verify token
export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  const decoded = verifyToken(token)
  
  if (!decoded) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  return NextResponse.json({ valid: true, user: decoded })
}
