'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Megaphone, 
  CheckCircle, 
  Loader2,
  Target,
  Users,
  Award
} from 'lucide-react'

export default function FundraisePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fundraiserType: '',
    goal: '',
    date: '',
    location: '',
    description: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/support/fundraise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          fundraiserType: '',
          goal: '',
          date: '',
          location: '',
          description: '',
          notes: ''
        })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const fundraiserTypes = [
    'Birthday Fundraiser',
    'School Campaign',
    'Workplace Giving',
    'Community Event',
    'Online Campaign',
    'Sports Event',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Back to Support */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link 
          href="/support" 
          className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Support
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-[#003A99] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Megaphone className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Fundraise for <span className="text-[#FFEB00]">OGOP</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Organize a campaign, event, or initiative to raise funds and awareness for teen mothers in Malawi.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            How <span className="text-[#003A99]">Fundraising</span> Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Target className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">1. Plan</h3>
              <p className="text-sm text-[#4A4F59]">Decide on your fundraiser type, goal, and timeline</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Users className="w-12 h-12 text-[#1A7F00] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">2. Launch</h3>
              <p className="text-sm text-[#4A4F59]">Share your campaign with your community and networks</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Award className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">3. Impact</h3>
              <p className="text-sm text-[#4A4F59]">OGOP receives funds and transforms lives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fundraiser Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-[#1A7F00] text-white p-6 mb-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-white/80 mt-2">Your fundraiser idea has been submitted. OGOP will contact you shortly.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/" 
                    className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors"
                  >
                    Return Home
                  </Link>
                  <Link 
                    href="/support" 
                    className="inline-block border-2 border-[#003A99] text-[#003A99] px-6 py-3 font-bold hover:bg-[#003A99] hover:text-white transition-colors"
                  >
                    Support More
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  Start Your <span className="text-[#003A99]">Fundraiser</span>
                </h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <select
                      name="fundraiserType"
                      value={formData.fundraiserType}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                    >
                      <option value="">Type of Fundraiser</option>
                      {fundraiserTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="goal"
                      placeholder="Fundraising Goal (USD)"
                      value={formData.goal}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>

                  <input
                    type="text"
                    name="location"
                    placeholder="Location / Platform"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />

                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe your fundraiser idea..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                  />

                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Additional information..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                  />

                  {error && (
                    <div className="bg-[#E31E24] text-white px-4 py-3 text-center text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Start Fundraising'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
