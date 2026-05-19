'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Program {
  id: number
  icon: string
  title: string
  description: string
  longDescription: string
  image: string
}

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => setPrograms(data))
      .catch(console.error)
  }, [])

  return (
    <section className="programs" id="programs">
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="highlight">Programs</span></h2>
          <div className="underline"></div>
          <p className="section-subtitle">
            Comprehensive support to empower teen mothers and transform their futures
          </p>
        </div>

        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-icon">
                <i className={`fas ${program.icon}`}></i>
              </div>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <button 
                className="read-more"
                onClick={() => setExpandedId(expandedId === program.id ? null : program.id)}
              >
                {expandedId === program.id ? 'Read Less' : 'Read More'}
              </button>
              {expandedId === program.id && (
                <div className="expanded-content">
                  <p>{program.longDescription}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/programs" className="btn btn-primary">
            View All Programs
          </Link>
        </div>
      </div>

      <style jsx>{`
        .programs {
          padding: 80px 0;
          background: white;
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
          color: #333;
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
          color: #666;
          font-size: 1.1rem;
        }
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        .program-card {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s;
          cursor: pointer;
        }
        .program-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .program-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #E91E63, #9C27B0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .program-icon i {
          font-size: 2.5rem;
          color: white;
        }
        .program-card h3 {
          margin-bottom: 15px;
          color: #333;
        }
        .program-card p {
          color: #666;
          line-height: 1.6;
        }
        .read-more {
          background: none;
          border: none;
          color: #E91E63;
          margin-top: 15px;
          cursor: pointer;
          font-weight: 600;
        }
        .expanded-content {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        .btn {
          padding: 0.8rem 2rem;
          border-radius: 40px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-primary {
          background: #E91E63;
          color: white;
        }
        .btn-primary:hover {
          background: #C2185B;
          transform: translateY(-3px);
        }
        .text-center {
          text-align: center;
        }
        @media (max-width: 768px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
