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

export default function ImpactSection() {
  const [stats, setStats] = useState<Stat[]>([
    { id: 1, number: 4, label: 'Teen Mothers Re-enrolled', suffix: '+' },
    { id: 2, number: 50, label: 'Reported Improved Mental Health', suffix: '%' },
    { id: 3, number: 50, label: 'Parents Now Supporting Education', suffix: '%' },
    { id: 4, number: 50, label: 'Returned to School', suffix: '%' },
  ])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    fetch('/api/content?type=stats')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setStats(data)
      })
      .catch(console.error)
  }, [])

  return (
    <section className="py-16 md:py-20 bg-[#003A99] text-white" id="impact" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-[#FFEB00]">Impact</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-4 mb-4" />
          <p className="text-white/80 max-w-2xl mx-auto">Real change, measurable results</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="border border-white/20 p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FFEB00]">
                {inView && (
                  <CountUp 
                    start={0} 
                    end={stat.number} 
                    duration={2.5} 
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="mt-2 text-white/90 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="border border-white/20 p-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFEB00]">Key Milestones</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#FFEB00] mt-1">✓</span>
                <span className="text-white/90">Founded in 2023 with a mission to restore hope</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFEB00] mt-1">✓</span>
                <span className="text-white/90">Successfully re-enrolled teen mothers in schools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFEB00] mt-1">✓</span>
                <span className="text-white/90">Established community partnerships in Malawi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFEB00] mt-1">✓</span>
                <span className="text-white/90">Launched skills development programs</span>
              </li>
            </ul>
          </div>
          <div className="border border-white/20 p-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFEB00]">Success Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>School Re-enrollment</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-2 bg-white/20">
                  <div className="h-full bg-[#FFEB00] w-[50%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mental Health Improvement</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-2 bg-white/20">
                  <div className="h-full bg-[#FFEB00] w-[50%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Parental Support</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-2 bg-white/20">
                  <div className="h-full bg-[#FFEB00] w-[50%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
