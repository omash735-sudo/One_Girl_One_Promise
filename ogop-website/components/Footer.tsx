'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SiteSettings {
  siteTitle: string
  contactEmail: string
  contactPhone: string
  address: string
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: 'One Goal One Promise',
    contactEmail: 'onegirlonepromise@gmail.com',
    contactPhone: '+265 983 711 922',
    address: 'Mdeka, Malawi'
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
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#FFEB00]">{settings.siteTitle}</h3>
            <p className="text-[#FFEB00] italic text-sm mb-2">"Yes, I Can Become"</p>
            <p className="text-gray-400 text-sm">Empowering teen mothers in Malawi through education, counselling, and skills development.</p>
          </div>

          <div>
            <h4 className="font-bold text-[#FFEB00] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#FFEB00] transition-colors">About</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Programs</Link></li>
              <li><Link href="/impact" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Impact</Link></li>
              <li><Link href="/stories" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Stories</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#FFEB00] mb-3">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/donate" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Donate</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Volunteer</Link></li>
              <li><Link href="/partner" className="text-gray-400 hover:text-[#FFEB00] transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#FFEB00] mb-3">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.siteTitle}. All rights reserved.</p>
          <p className="text-[#FFEB00] text-xs mt-1">Based on Isaiah 61:7</p>
        </div>
      </div>
    </footer>
  )
}
