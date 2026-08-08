import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const milestones = await sql`
      SELECT milestone FROM impact_milestones 
      WHERE is_active = true 
      ORDER BY display_order
    `
    
    const metrics = await sql`
      SELECT metric_name, percentage FROM impact_metrics 
      ORDER BY display_order
    `
    
    const metricsObj: any = {}
    metrics.forEach((m: any) => {
      const key = m.metric_name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
      metricsObj[key] = m.percentage
    })
    
    return NextResponse.json({
      milestones: milestones.map((m: any) => m.milestone),
      metrics: {
        schoolReenrollment: metricsObj.schoolReenrollment || 50,
        mentalHealthImprovement: metricsObj.mentalHealthImprovement || 50,
        parentalSupport: metricsObj.parentalSupport || 50
      }
    })
  } catch (error) {
    console.error('Impact GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
