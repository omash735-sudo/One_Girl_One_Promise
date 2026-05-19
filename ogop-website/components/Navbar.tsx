'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/impact', label: 'Impact' },
    { href: '/stories', label: 'Stories' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="logo">
            <img src="/assets/logo.png" alt="OGOP Logo" onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/50x50?text=OGOP'
            }} />
            <span>One Girl <span className="highlight">One Promise</span></span>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/donate" className="donate-btn">
                Donate Now
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: white;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .navbar.scrolled {
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          background: rgba(255,255,255,0.98);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
        }
        .logo img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
        }
        .logo .highlight {
          color: #E91E63;
        }
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        .nav-menu a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-menu a:hover,
        .nav-menu a.active {
          color: #E91E63;
        }
        .donate-btn {
          background: #E91E63;
          color: white !important;
          padding: 0.6rem 1.2rem;
          border-radius: 30px;
          transition: all 0.3s;
        }
        .donate-btn:hover {
          background: #C2185B;
          transform: translateY(-2px);
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #E91E63;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            flex-direction: column;
            background: white;
            width: 100%;
            padding: 2rem;
            gap: 1.5rem;
            transition: left 0.3s;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .nav-menu.active {
            left: 0;
          }
          .container {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  )
}
