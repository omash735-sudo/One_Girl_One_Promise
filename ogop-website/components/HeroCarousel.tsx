'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  id: number
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  badge?: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Yes, I Can Become',
    description: 'Restoring hope and opportunity to teen mothers in rural Malawi through education and support.',
    image: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786228154/IMG-20260809-WA0000_kq2bnn.jpg',
    ctaText: 'Support a Girl',
    ctaLink: '/donate',
    badge: 'Our Mission'
  },
  {
    id: 2,
    title: 'Join Us in Making a Difference',
    description: 'Become part of our mission to restore hope and create opportunities for young mothers.',
    image: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786228094/IMG-20260809-WA0006_whfegv.jpg',
    ctaText: 'Support Us',
    ctaLink: '/support',
    badge: 'Get Involved'
  },
  {
    id: 3,
    title: 'Empowering Teen Mothers Through Education',
    description: 'Providing access to quality education and life skills training for young mothers in Malawi.',
    image: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786228094/IMG-20260809-WA0005_e9weot.jpg',
    ctaText: 'Learn More',
    ctaLink: '/about',
    badge: 'Current Initiative'
  },
  {
    id: 4,
    title: 'Community Support & Outreach',
    description: 'Reaching families in rural communities with essential supplies and support services.',
    image: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786228154/IMG-20260809-WA0001_niyrre.jpg',
    ctaText: 'View Our Work',
    ctaLink: '/our-work',
    badge: 'Community Outreach'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  return (
    <section 
      className="relative w-full bg-[#1A1A1A]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    {slide.badge && (
                      <span className="inline-block bg-[#FFEB00] text-[#1A1A1A] px-3 py-1 text-sm font-bold mb-4">
                        {slide.badge}
                      </span>
                    )}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl text-gray-200 mb-4 md:mb-6 max-w-2xl">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.ctaLink}
                      className="inline-block bg-[#1A7F00] text-white px-6 md:px-8 py-2.5 md:py-3 font-bold text-sm md:text-base hover:bg-[#136000] transition-colors"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls - Only visible on hover or touch */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="relative h-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <button
              onClick={prevSlide}
              className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 pointer-events-auto bg-[#1A7F00] p-2 sm:p-3 hover:bg-[#136000] transition-all duration-300 z-30 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-auto bg-[#1A7F00] p-2 sm:p-3 hover:bg-[#136000] transition-all duration-300 z-30 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide 
                  ? 'bg-[#FFEB00] w-6 sm:w-8 h-1' 
                  : 'bg-white/50 w-2 sm:w-3 h-1 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
