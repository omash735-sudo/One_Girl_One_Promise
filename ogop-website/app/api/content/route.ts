import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET all content
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    
    if (type === 'hero') {
      const hero = await sql`SELECT * FROM hero_content ORDER BY id DESC LIMIT 1`
      return NextResponse.json(hero[0] || {})
    }
    
    if (type === 'about') {
      const about = await sql`SELECT * FROM about_content ORDER BY id DESC LIMIT 1`
      const values = await sql`SELECT * FROM core_values WHERE is_active = true ORDER BY display_order`
      return NextResponse.json({ about: about[0] || {}, values })
    }
    
    if (type === 'stats') {
      const stats = await sql`SELECT * FROM stats WHERE is_active = true ORDER BY display_order`
      return NextResponse.json(stats)
    }
    
    if (type === 'settings') {
      const settings = await sql`SELECT * FROM site_settings`
      const settingsObj: any = {}
      settings.forEach(s => { settingsObj[s.key] = s.value })
      return NextResponse.json(settingsObj)
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    
  } catch (error) {
    console.error('GET content error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// UPDATE content (requires admin)
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { type, data } = await req.json()
    
    if (type === 'hero') {
      await sql`
        INSERT INTO hero_content (title, subtitle, button1_text, button1_link, button2_text, button2_link, background_image)
        VALUES (${data.title}, ${data.subtitle}, ${data.button1Text}, ${data.button1Link}, ${data.button2Text}, ${data.button2Link}, ${data.backgroundImage})
      `
      return NextResponse.json({ success: true })
    }
    
    if (type === 'about') {
      await sql`
        INSERT INTO about_content (scripture, description, vision, mission)
        VALUES (${data.scripture}, ${data.description}, ${data.vision}, ${data.mission})
      `
      return NextResponse.json({ success: true })
    }
    
    if (type === 'settings') {
      for (const [key, value] of Object.entries(data)) {
        await sql`
          INSERT INTO site_settings (key, value)
          VALUES (${key}, ${value})
          ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
        `
      }
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    
  } catch (error) {
    console.error('UPDATE content error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
