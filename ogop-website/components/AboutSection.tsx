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
    scripture: 'Instead of your shame there shall be a double portion...',
    description: 'One Girl One Promise (OGOP) is a non-governmental organization founded on Godly principles, based in Malawi. Founded in 2023, OGOP is committed to restoring hope and opportunity to teenage mothers from underprivileged rural communities.',
    vision: 'A Malawi where every teen mother has the opportunity to return to school, achieve her dreams, and contribute meaningfully to society.',
    mission: 'To empower teen mothers from underprivileged communities by providing educational support, psychological and spiritual rehabilitation, and skills development.'
  })
  const [coreValues, setCoreValues] = useState<CoreValue[]>([
    { id: 1, icon: 'fa-heart', title: 'Compassion', description: 'We treat each girl with love, respect, and understanding.' },
    { id: 2, icon: 'fa-star', title: 'Empowerment', description: 'We believe in equipping teen mothers with education and skills.' },
    { id: 3, icon: 'fa-shield', title: 'Integrity', description: 'We uphold transparency, accountability, and ethical conduct.' },
    { id: 4, icon: 'fa-users', title: 'Inclusivity', description: 'We serve all teen mothers irrespective of background.' },
    { id: 5, icon: 'fa-church', title: 'Faith-Based', description: 'We integrate Christian values in counselling and rehabilitation.' }
  ])

  useEffect(() => {
    fetch('/api/content?type=about')
      .then(res => res.json())
      .then(data => {
        if (data.about) setAbout(data.about)
        if (data.values) setCoreValues(data.values)
      })
      .catch(console.error)
  }, [])

  return (
    <section className="py-16 md:py-20 bg-[#F8F9FA]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            About <span className="text-[#003A99]">OGOP</span>
          </h2>
          <div className="w-16 h-1 bg-[#003A99] mx-auto mt-4 mb-4" />
          <p className="text-[#4A4F59] max-w-2xl mx-auto">One Girl One Promise - Transforming lives through education and compassion</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            {about.scripture && (
              <div className="bg-[#003A99] text-white p-6 mb-6">
                <p className="italic text-lg">"{about.scripture}"</p>
              </div>
            )}
            <p className="text-[#4A4F59] leading-relaxed mb-6">{about.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-[#E0E2E6] p-6 bg-white">
                <span className="text-3xl text-[#003A99]">👁️</span>
                <h3 className="font-bold text-[#1A1A1A] mt-2 mb-1">Our Vision</h3>
                <p className="text-sm text-[#4A4F59]">{about.vision}</p>
              </div>
              <div className="border border-[#E0E2E6] p-6 bg-white">
                <span className="text-3xl text-[#1A7F00]">🎯</span>
                <h3 className="font-bold text-[#1A1A1A] mt-2 mb-1">Our Mission</h3>
                <p className="text-sm text-[#4A4F59]">{about.mission}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#003A99] p-6 flex items-center justify-center min-h-[300px]">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2">Empowering Teen Mothers</h3>
              <p className="text-white/80">Restoring hope and creating opportunities for a brighter future.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center text-[#1A1A1A] mb-8">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreValues.map((value) => (
              <div key={value.id} className="border border-[#E0E2E6] p-6 bg-white text-center hover:border-[#003A99] transition-colors">
                <i className={`fas ${value.icon} text-3xl text-[#003A99] mb-3`}></i>
                <h4 className="font-bold text-[#1A1A1A] mb-2">{value.title}</h4>
                <p className="text-sm text-[#4A4F59]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
