import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { resetKey, newPassword } = await req.json()
    
    // This is your secret reset key - change it to something only you know
    const RESET_KEY = 'OGOP_RESET_2024'
    
    if (!resetKey || resetKey !== RESET_KEY) {
      return NextResponse.json({ 
        error: 'Invalid reset key. Please contact the administrator.' 
      }, { status: 401 })
    }
    
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ 
        error: 'Password must be at least 6 characters long.' 
      }, { status: 400 })
    }
    
    const hashedPassword = await hashPassword(newPassword)
    
    await sql`
      UPDATE admin_users 
      SET password_hash = ${hashedPassword}
      WHERE username = 'admin'
    `
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successful! Use your new password to login.' 
    })
    
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ 
      error: 'Server error. Please try again later.' 
    }, { status: 500 })
  }
}
