'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroContent {
  title: string
  subtitle: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
  backgroundImage: string
}

export default function HeroSection() {
  const [content, setContent] = useState<HeroContent>({
    title: 'Yes, I Can Become',
    subtitle: 'Restoring hope and opportunity to teen mothers in rural Malawi',
    button1Text: 'Support a Girl',
    button1Link: '/donate',
    button2Text: 'Our Programs',
    button2Link: '/programs',
    backgroundImage: ''
  })

  useEffect(() => {
    fetch('/api/content?type=hero')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div 
        className="hero-bg"
        style={{
          backgroundImage: content.backgroundImage 
            ? `url(${content.backgroundImage})` 
            : 'url(https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      ></div>
      
      <div className="container hero-content">
        <h1 className="hero-title animate-fade-up">
          {content.title}
        </h1>
        <p className="hero-subtitle animate-fade-up delay-1">
          {content.subtitle}
        </p>
        <div className="hero-buttons animate-fade-up delay-2">
          <Link href={content.button1Link} className="btn btn-primary">
            {content.button1Text}
          </Link>
          <Link href={content.button2Link} className="btn btn-secondary">
            {content.button2Text}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 90vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5));
          z-index: 1;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.05);
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        }
        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
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
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        .btn-secondary:hover {
          background: white;
          color: #E91E63;
          transform: translateY(-3px);
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-buttons {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
