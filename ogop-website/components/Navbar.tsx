'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeartHandshake, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJoinUsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/our-work', label: 'Our Work' },
    { href: '/research', label: 'Research' },
  ]

  const joinUsOptions = [
    { href: '/donate/now', label: 'Donate Now' },
    { href: '/donate/monthly', label: 'Donate Monthly' },
    { href: '/become-member', label: 'Become a Member' },
    { href: '/partner', label: 'Partner With Us' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/careers', label: 'Work With Us' },
  ]

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img 
                src="https://res.cloudinary.com/dfsvnaslv/image/upload/v1786219258/file_0000000034e48246addcab843282da68_260808214416_l1r4bm.png"
                alt="One Girl One Promise Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="text-[#1A1A1A] font-bold text-lg md:text-xl tracking-tight">
                  One Girl
                </span>
                <span className="text-[#FFEB00] font-bold text-lg md:text-xl tracking-tight">
                  {' '}One Promise
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-semibold transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-[#003A99] border-b-2 border-[#003A99] pb-1'
                      : 'text-[#1A1A1A] hover:text-[#003A99]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                  className={`text-base font-semibold transition-colors duration-200 flex items-center gap-1 ${
                    isJoinUsOpen ? 'text-[#003A99]' : 'text-[#1A1A1A] hover:text-[#003A99]'
                  }`}
                >
                  Join Us
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isJoinUsOpen ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isJoinUsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#E0E2E6] shadow-lg">
                    <div className="py-2">
                      {joinUsOptions.map((option) => (
                        <Link
                          key={option.href}
                          href={option.href}
                          className="block px-4 py-2.5 text-sm font-medium text-[#1A1A1A] hover:text-[#1A7F00] hover:bg-[#F8F9FA] transition-colors"
                          onClick={() => setIsJoinUsOpen(false)}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/support"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#1A7F00] text-[#1A7F00] font-bold text-sm transition-all hover:bg-[#1A7F00] hover:text-white"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Support Us</span>
              </Link>
            </nav>

            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/support"
                className="flex items-center gap-1.5 px-3 py-2 border-2 border-[#1A7F00] text-[#1A7F00] font-bold text-xs transition-all hover:bg-[#1A7F00] hover:text-white"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Support</span>
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded hover:bg-[#F8F9FA] transition-colors flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1A1A1A]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#1A1A1A]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="fixed top-16 md:top-20 left-0 w-[85%] max-w-sm h-[calc(100vh-4rem)] bg-white shadow-2xl overflow-y-auto animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-6">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 text-base font-semibold transition-colors ${
                        pathname === link.href
                          ? 'text-[#003A99] bg-[#F8F9FA] border-l-4 border-[#003A99]'
                          : 'text-[#1A1A1A] hover:text-[#003A99] hover:bg-[#F8F9FA]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="mt-1">
                    <button
                      onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-[#1A1A1A] hover:text-[#003A99] hover:bg-[#F8F9FA] transition-colors"
                    >
                      <span>Join Us</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isJoinUsOpen ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isJoinUsOpen && (
                      <div className="ml-4 mt-1 border-l-2 border-[#E0E2E6]">
                        {joinUsOptions.map((option) => (
                          <Link
                            key={option.href}
                            href={option.href}
                            className="block px-4 py-2.5 text-sm font-medium text-[#1A1A1A] hover:text-[#1A7F00] hover:bg-[#F8F9FA] transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setIsJoinUsOpen(false)
                            }}
                          >
                            {option.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/support"
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1A7F00] text-[#1A7F00] font-bold text-base transition-all hover:bg-[#1A7F00] hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HeartHandshake className="w-5 h-5" />
                    <span>Support Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      <div className="h-16 md:h-20" />
    </>
  )
}
