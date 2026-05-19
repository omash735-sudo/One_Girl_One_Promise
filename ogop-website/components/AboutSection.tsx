'use client'

import { useEffect, useState } from 'react'

interface AboutContent {
  scripture: string
  description: string
  vision: string
  mission: string
}

interface CoreValue {
  id: number
  icon: string
  title: string
  description: string
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutContent>({
    scripture: '',
    description: '',
    vision: '',
    mission: ''
  })
  const [coreValues, setCoreValues] = useState<CoreValue[]>([])

  useEffect(() => {
    fetch('/api/content?type=about')
      .then(res => res.json())
      .then(data => {
        setAbout(data.about || {})
        setCoreValues(data.values || [])
      })
      .catch(console.error)
  }, [])

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2>About <span className="highlight">OGOP</span></h2>
          <div className="underline"></div>
          <p className="section-subtitle">One Girl One Promise - Transforming lives through education and compassion</p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            {about.scripture && (
              <div className="scripture-box">
                <i className="fas fa-bible"></i>
                <p>"{about.scripture}"</p>
              </div>
            )}
            <p className="description">{about.description}</p>
            
            <div className="mission-vision">
              <div className="card">
                <i className="fas fa-eye"></i>
                <h3>Our Vision</h3>
                <p>{about.vision}</p>
              </div>
              <div className="card">
                <i className="fas fa-bullseye"></i>
                <h3>Our Mission</h3>
                <p>{about.mission}</p>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img 
              src="/assets/about-image.jpg" 
              alt="Teen mothers being empowered"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              }}
            />
          </div>
        </div>

        <div className="core-values">
          <h3>Our Core Values</h3>
          <div className="values-grid">
            {coreValues.map((value) => (
              <div key={value.id} className="value-card">
                <i className={`fas ${value.icon}`}></i>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          padding: 80px 0;
          background: #f9f9f9;
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
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          margin-bottom: 60px;
        }
        .scripture-box {
          background: linear-gradient(135deg, #E91E63, #9C27B0);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 25px;
          text-align: center;
        }
        .scripture-box i {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .scripture-box p {
          font-style: italic;
          font-size: 1.1rem;
        }
        .description {
          line-height: 1.8;
          color: #555;
          margin-bottom: 30px;
        }
        .mission-vision {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .mission-vision .card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        .mission-vision .card:hover {
          transform: translateY(-5px);
        }
        .mission-vision .card i {
          font-size: 2rem;
          color: #E91E63;
          margin-bottom: 15px;
        }
        .mission-vision .card h3 {
          margin-bottom: 10px;
          color: #333;
        }
        .about-image img {
          width: 100%;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .core-values {
          margin-top: 40px;
        }
        .core-values h3 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 40px;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .value-card {
          text-align: center;
          padding: 30px;
          background: white;
          border-radius: 10px;
          transition: all 0.3s;
        }
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .value-card i {
          font-size: 2.5rem;
          color: #E91E63;
          margin-bottom: 15px;
        }
        .value-card h4 {
          margin-bottom: 10px;
          color: #333;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .mission-vision {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
