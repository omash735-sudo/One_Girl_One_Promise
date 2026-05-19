'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SiteSettings {
  siteTitle: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    whatsapp: string
  }
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: 'One Girl One Promise',
    contactEmail: 'onegirlonepromise@gmail.com',
    contactPhone: '+265 983 711 922',
    address: 'Mdeka, Malawi',
    socialMedia: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      whatsapp: 'https://wa.me/265983711922'
    }
  })

  useEffect(() => {
    fetch('/api/content?type=settings')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }))
        }
      })
      .catch(console.error)
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>{settings.siteTitle}</h3>
            <p className="motto">"Yes, I Can Become"</p>
            <p>Empowering teen mothers in Malawi through education, counselling, and skills development.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/impact">Impact</Link></li>
              <li><Link href="/stories">Stories</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul>
              <li><Link href="/donate">Donate</Link></li>
              <li><Link href="/volunteer">Volunteer</Link></li>
              <li><Link href="/partner">Partner With Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li><i className="fas fa-map-marker-alt"></i> {settings.address}</li>
              <li><i className="fas fa-phone"></i> {settings.contactPhone}</li>
              <li><i className="fas fa-envelope"></i> {settings.contactEmail}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {settings.siteTitle}. All rights reserved.</p>
          <p className="scripture">Based on Isaiah 61:7</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1a1a2e;
          color: #fff;
          padding: 50px 0 20px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-section h3, .footer-section h4 {
          margin-bottom: 20px;
          color: #E91E63;
        }
        .motto {
          font-style: italic;
          margin: 15px 0;
          font-size: 1.1rem;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        .footer-section ul li {
          margin-bottom: 10px;
        }
        .footer-section ul li a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-section ul li a:hover {
          color: #E91E63;
        }
        .contact-info li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #ccc;
        }
        .contact-info li i {
          color: #E91E63;
          width: 20px;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #333;
          color: #888;
        }
        .scripture {
          margin-top: 10px;
          font-size: 0.9rem;
          font-style: italic;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .contact-info li {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}
