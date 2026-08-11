import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'all'
    
    let data = {}
    
    if (type === 'donations' || type === 'all') {
      const donations = await sql`
        SELECT * FROM donations ORDER BY created_at DESC
      `
      data = { ...data, donations }
    }
    
    if (type === 'supplies' || type === 'all') {
      const supplies = await sql`
        SELECT * FROM supply_donations ORDER BY created_at DESC
      `
      data = { ...data, supplies }
    }
    
    if (type === 'fundraisers' || type === 'all') {
      const fundraisers = await sql`
        SELECT * FROM fundraiser_requests ORDER BY created_at DESC
      `
      data = { ...data, fundraisers }
    }
    
    if (type === 'sponsorships' || type === 'all') {
      const sponsorships = await sql`
        SELECT * FROM sponsorship_inquiries ORDER BY created_at DESC
      `
      data = { ...data, sponsorships }
    }
    
    return NextResponse.json({ success: true, ...data })
  } catch (error) {
    console.error('Admin support error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
