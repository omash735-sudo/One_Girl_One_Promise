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
    metrics.forEach(m => {
      metricsObj[m.metric_name] = m.percentage
    })
    
    return NextResponse.json({
      milestones: milestones.map(m => m.milestone),
      metrics: metricsObj
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
