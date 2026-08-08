'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribing(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      }
    } catch (err) {
      console.error('Newsletter error:', err)
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-[#003A99] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-white/80 mb-8">Stay updated on our programs, success stories, and ways to help</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FFEB00]"
          />
          <button 
            type="submit" 
            disabled={subscribing}
            className="bg-[#FFEB00] text-[#1A1A1A] px-6 py-3 font-bold hover:bg-[#E6D400] transition-colors disabled:opacity-50"
          >
            {subscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {subscribed && (
          <div className="mt-4 bg-[#1A7F00] text-white px-4 py-2 inline-block">
            Thank you for subscribing!
          </div>
        )}
      </div>
    </section>
  )
}
