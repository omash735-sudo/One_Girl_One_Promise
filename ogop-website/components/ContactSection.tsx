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
    <section className="py-16 md:py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Get In <span className="text-[#003A99]">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-[#003A99] mx-auto mt-4 mb-4" />
          <p className="text-[#4A4F59]">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="border border-[#E0E2E6] p-6 flex items-center gap-4">
              <span className="text-2xl text-[#003A99]">📍</span>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Visit Us</h4>
                <p className="text-[#4A4F59] text-sm">Mdeka, Malawi</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-6 flex items-center gap-4">
              <span className="text-2xl text-[#1A7F00]">📞</span>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Call Us</h4>
                <p className="text-[#4A4F59] text-sm">+265 983 711 922</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-6 flex items-center gap-4">
              <span className="text-2xl text-[#FFEB00]">✉️</span>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Email Us</h4>
                <p className="text-[#4A4F59] text-sm">onegirlonepromise@gmail.com</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-6 text-center">
              <h4 className="font-bold text-[#1A1A1A] mb-3">Follow Us</h4>
              <div className="flex justify-center gap-3">
                <a href="#" className="bg-[#003A99] text-white w-10 h-10 flex items-center justify-center hover:bg-[#002A70] transition-colors">📘</a>
                <a href="#" className="bg-[#003A99] text-white w-10 h-10 flex items-center justify-center hover:bg-[#002A70] transition-colors">📷</a>
                <a href="#" className="bg-[#003A99] text-white w-10 h-10 flex items-center justify-center hover:bg-[#002A70] transition-colors">🐦</a>
                <a href="https://wa.me/265983711922" className="bg-[#1A7F00] text-white w-10 h-10 flex items-center justify-center hover:bg-[#136000] transition-colors">💬</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="border border-[#E0E2E6] p-6 bg-[#F8F9FA]">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white mt-4"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white mt-4 resize-vertical"
              />
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors mt-4 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && <div className="mt-4 bg-[#1A7F00] text-white px-4 py-2 text-center">Message sent successfully!</div>}
              {error && <div className="mt-4 bg-[#E31E24] text-white px-4 py-2 text-center">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
