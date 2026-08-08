'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeartHandshake } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJoinUsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on resize to desktop
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
    { href: '/about', label: 'About Us' },
    { href: '/our-work', label: 'Our Work' },
    { href: '/research', label: 'Research / Publications' },
    { href: '/contact', label: 'Contact' },
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
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 shadow-md backdrop-blur-sm' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img 
                src="https://res.cloudinary.com/dfsvnaslv/image/upload/v1786219258/file_0000000034e48246addcab843282da68_260808214416_l1r4bm.png"
                alt="One Goal One Promise Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="text-[#1A1A1A] font-bold text-lg md:text-xl tracking-tight">
                  One Goal
                </span>
                <span className="text-[#FFEB00] font-bold text-lg md:text-xl tracking-tight">
                  {' '}One Promise
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
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

              {/* Join Us Dropdown */}
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

                {/* Dropdown Menu */}
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

              {/* Support Button */}
              <Link
                href="/support"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#1A7F00] text-[#1A7F00] font-bold text-sm transition-all hover:bg-[#1A7F00] hover:text-white"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Support Us</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#003A99] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-16 md:top-20 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ height: 'calc(100vh - 4rem)' }}
        >
          <div className="h-full overflow-y-auto px-4 py-6">
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

              {/* Mobile Join Us Accordion */}
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

              {/* Mobile Support Button */}
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
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  )
}
