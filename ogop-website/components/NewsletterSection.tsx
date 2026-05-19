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
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated on our programs, success stories, and ways to help</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={subscribing}>
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscribed && <div className="success">Thank you for subscribing!</div>}
        </div>
      </div>

      <style jsx>{`
        .newsletter {
          background: linear-gradient(135deg, #E91E63, #9C27B0);
          padding: 60px 0;
          color: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .newsletter-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        .newsletter-content h3 {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }
        .newsletter-form {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }
        .newsletter-form input {
          flex: 1;
          padding: 15px;
          border: none;
          border-radius: 40px;
          font-size: 1rem;
        }
        .newsletter-form button {
          background: #2C3E50;
          color: white;
          border: none;
          padding: 0 30px;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        .newsletter-form button:hover {
          background: #1a252f;
          transform: translateY(-2px);
        }
        .success {
          margin-top: 20px;
          padding: 10px;
          background: rgba(255,255,255,0.2);
          border-radius: 40px;
        }
        @media (max-width: 768px) {
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-form button {
            padding: 12px;
          }
        }
      `}</style>
    </section>
  )
}
