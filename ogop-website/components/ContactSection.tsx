'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In <span className="highlight">Touch</span></h2>
          <div className="underline"></div>
          <p className="section-subtitle">We'd love to hear from you</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Visit Us</h4>
                <p>Mdeka, Malawi</p>
              </div>
            </div>
            <div className="info-card">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Call Us</h4>
                <p>+265 983 711 922</p>
              </div>
            </div>
            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email Us</h4>
                <p>onegirlonepromise@gmail.com</p>
              </div>
            </div>
            <div className="social-media">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
                <a href="#" target="_blank"><i className="fab fa-instagram"></i></a>
                <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
                <a href="https://wa.me/265983711922" target="_blank"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && <div className="success-message">Message sent successfully!</div>}
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          padding: 80px 0;
          background: #f9f9f9;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-header h2 {
          font-size: 2.5rem;
          color: #333;
        }
        .highlight {
          color: #E91E63;
        }
        .underline {
          width: 60px;
          height: 3px;
          background: #E91E63;
          margin: 15px auto;
        }
        .section-subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
        }
        .info-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          margin-bottom: 20px;
          transition: transform 0.3s;
        }
        .info-card:hover {
          transform: translateX(5px);
        }
        .info-card i {
          font-size: 1.8rem;
          color: #E91E63;
        }
        .info-card h4 {
          margin-bottom: 5px;
          color: #333;
        }
        .social-media {
          margin-top: 30px;
          text-align: center;
        }
        .social-icons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 15px;
        }
        .social-icons a {
          width: 40px;
          height: 40px;
          background: #E91E63;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .social-icons a:hover {
          background: #C2185B;
          transform: translateY(-3px);
        }
        .contact-form form {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 1rem;
        }
        textarea {
          resize: vertical;
        }
        button {
          background: #E91E63;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        button:hover {
          background: #C2185B;
          transform: translateY(-2px);
        }
        .success-message {
          background: #4CAF50;
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-top: 15px;
          text-align: center;
        }
        .error-message {
          background: #f44336;
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-top: 15px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
