import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const featured = searchParams.get('featured')
    
    let query = `SELECT * FROM girls WHERE status = 'active'`
    
    if (id) {
      query += ` AND id = ${id}`
    }
    
    if (featured === 'true') {
      query += ` AND is_featured = true`
    }
    
    query += ` ORDER BY display_order, created_at DESC`
    
    const girls = await sql(query)
    
    if (id && girls.length > 0) {
      const needs = await sql`
        SELECT * FROM girl_sponsorship_needs 
        WHERE girl_id = ${id} 
        ORDER BY display_order
      `
      return NextResponse.json({ ...girls[0], needs })
    }
    
    const girlsWithNeeds = []
    for (const girl of girls) {
      const needs = await sql`
        SELECT * FROM girl_sponsorship_needs 
        WHERE girl_id = ${girl.id} 
        ORDER BY display_order
      `
      girlsWithNeeds.push({ ...girl, needs })
    }
    
    return NextResponse.json(girlsWithNeeds)
  } catch (error) {
    console.error('GET girls error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { name, age, location, school, grade, dream, story, imageUrl, isFeatured, displayOrder, needs } = await req.json()
    
    const result = await sql`
      INSERT INTO girls (name, age, location, school, grade, dream, story, image_url, is_featured, display_order)
      VALUES (${name}, ${age}, ${location}, ${school}, ${grade}, ${dream}, ${story}, ${imageUrl}, ${isFeatured || false}, ${displayOrder || 0})
      RETURNING *
    `
    
    const girl = result[0]
    
    if (needs && needs.length > 0) {
      for (const need of needs) {
        await sql`
          INSERT INTO girl_sponsorship_needs (girl_id, item_name, description, amount_mk, amount_usd, display_order)
          VALUES (${girl.id}, ${need.itemName}, ${need.description}, ${need.amountMk}, ${need.amountUsd}, ${need.displayOrder || 0})
        `
      }
    }
    
    return NextResponse.json({ success: true, girl })
  } catch (error) {
    console.error('POST girl error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

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
    
    const { id, name, age, location, school, grade, dream, story, imageUrl, status, isFeatured, displayOrder } = await req.json()
    
    await sql`
      UPDATE girls 
      SET 
        name = COALESCE(${name}, name),
        age = COALESCE(${age}, age),
        location = COALESCE(${location}, location),
        school = COALESCE(${school}, school),
        grade = COALESCE(${grade}, grade),
        dream = COALESCE(${dream}, dream),
        story = COALESCE(${story}, story),
        image_url = COALESCE(${imageUrl}, image_url),
        status = COALESCE(${status}, status),
        is_featured = COALESCE(${isFeatured}, is_featured),
        display_order = COALESCE(${displayOrder}, display_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT girl error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
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
    
    await sql`UPDATE girls SET status = 'inactive' WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE girl error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
