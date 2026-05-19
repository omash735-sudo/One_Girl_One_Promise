'use client'

import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

interface Stat {
  id: number
  number: number
  label: string
  suffix: string
}

interface ImpactData {
  milestones: string[]
  metrics: {
    schoolReenrollment: number
    mentalHealthImprovement: number
    parentalSupport: number
  }
}

export default function ImpactSection() {
  const [stats, setStats] = useState<Stat[]>([])
  const [impact, setImpact] = useState<ImpactData>({
    milestones: [],
    metrics: { schoolReenrollment: 0, mentalHealthImprovement: 0, parentalSupport: 0 }
  })
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    fetch('/api/content?type=stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error)
    
    fetch('/api/impact')
      .then(res => res.json())
      .then(data => setImpact(data))
      .catch(console.error)
  }, [])

  return (
    <section className="impact" id="impact" ref={ref}>
      <div className="container">
        <div className="section-header light">
          <h2>Our <span className="highlight">Impact</span></h2>
          <div className="underline light-underline"></div>
          <p className="section-subtitle">Real change, measurable results</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-number">
                {inView && (
                  <CountUp 
                    start={0} 
                    end={stat.number} 
                    duration={2.5} 
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-grid">
          <div className="milestones">
            <h3>Key Milestones</h3>
            <ul>
              {impact.milestones.map((milestone, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  {milestone}
                </li>
              ))}
            </ul>
          </div>

          <div className="metrics">
            <h3>Success Metrics</h3>
            <div className="metric-item">
              <span>School Re-enrollment</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${impact.metrics.schoolReenrollment}%` }}
                >
                  {impact.metrics.schoolReenrollment}%
                </div>
              </div>
            </div>
            <div className="metric-item">
              <span>Mental Health Improvement</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${impact.metrics.mentalHealthImprovement}%` }}
                >
                  {impact.metrics.mentalHealthImprovement}%
                </div>
              </div>
            </div>
            <div className="metric-item">
              <span>Parental Support</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${impact.metrics.parentalSupport}%` }}
                >
                  {impact.metrics.parentalSupport}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .impact {
          padding: 80px 0;
          background: linear-gradient(135deg, #2C3E50, #1a252f);
          color: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-header h2 {
          font-size: 2.5rem;
          color: white;
        }
        .highlight {
          color: #E91E63;
        }
        .underline {
          width: 60px;
          height: 3px;
          background: #E91E63;
          margin: 15px auto;
        }
        .section-subtitle {
          color: #ccc;
          font-size: 1.1rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        .stat-card {
          text-align: center;
          padding: 30px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          color: #E91E63;
          margin-bottom: 10px;
        }
        .impact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .milestones ul {
          list-style: none;
          padding: 0;
        }
        .milestones li {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .milestones li i {
          color: #4CAF50;
          font-size: 1.2rem;
        }
        .metric-item {
          margin-bottom: 20px;
        }
        .metric-item span {
          display: block;
          margin-bottom: 8px;
        }
        .progress-bar {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          overflow: hidden;
          height: 35px;
        }
        .progress-fill {
          background: #E91E63;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
          font-size: 0.9rem;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .impact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
