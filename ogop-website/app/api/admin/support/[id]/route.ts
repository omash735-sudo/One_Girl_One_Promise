import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function PUT(req: NextRequest) {
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
    const id = searchParams.get('id')
    const { type, status } = await req.json()
    
    let tableName = ''
    
    switch(type) {
      case 'donation': tableName = 'donations'; break
      case 'supply': tableName = 'supply_donations'; break
      case 'fundraiser': tableName = 'fundraiser_requests'; break
      case 'sponsorship': tableName = 'sponsorship_inquiries'; break
      default: return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
    
    await sql`
      UPDATE ${sql(tableName)} 
      SET status = ${status}
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update status error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
