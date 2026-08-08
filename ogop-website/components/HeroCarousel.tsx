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
    title: 'Empowering Teen Mothers Through Education',
    description: 'Providing access to quality education and life skills training for young mothers in Malawi.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Learn More',
    ctaLink: '/about',
    badge: 'Current Initiative'
  },
  {
    id: 2,
    title: 'Yes, I Can Become',
    description: 'Restoring hope and opportunity to teen mothers in rural Malawi through education and support.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Support a Girl',
    ctaLink: '/donate',
    badge: 'Our Mission'
  },
  {
    id: 3,
    title: 'Research Initiative: Breaking Barriers',
    description: 'Our latest research on education access for teen mothers in rural Malawi shows promising results.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaText: 'View Research',
    ctaLink: '/research',
    badge: 'Research'
  },
  {
    id: 4,
    title: 'Join Us in Making a Difference',
    description: 'Become part of our mission to restore hope and create opportunities for young mothers.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Support Us',
    ctaLink: '/support',
    badge: 'Get Involved'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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
    <section className="relative w-full bg-[#1A1A1A]">
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.ctaLink}
                      className="inline-block bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-[#1A7F00] p-2 hover:bg-[#136000] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-[#1A7F00] p-2 hover:bg-[#136000] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-colors ${
                index === currentSlide 
                  ? 'bg-[#FFEB00] w-8' 
                  : 'bg-white/50 w-3 hover:bg-white/70'
              } h-1`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
