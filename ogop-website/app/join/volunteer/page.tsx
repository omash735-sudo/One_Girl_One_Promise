'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  BookOpen, 
  Camera, 
  Users,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    availability: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const volunteerRoles = [
    {
      id: 'mentor',
      title: 'Mentor/Tutor',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Tutor teen moms 2hrs/week in Math/English'
    },
    {
      id: 'distribution',
      title: 'Kit Distributions',
      icon: <Heart className="w-6 h-6" />,
      description: 'Help pack and deliver school kits'
    },
    {
      id: 'skills',
      title: 'Skills-based',
      icon: <Camera className="w-6 h-6" />,
      description: 'Photography, Social media, Legal aid, Health talks'
    },
    {
      id: 'events',
      title: 'Events',
      icon: <Users className="w-6 h-6" />,
      description: 'Fundraisers, Back-to-school drives'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/join/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          skills: '',
          availability: '',
          message: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <section className="bg-[#003A99] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Volunteer <span className="text-[#FFEB00]">With Us</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Volunteer your time. Change a future. Help teen mothers return to school.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            Ways to <span className="text-[#003A99]">Volunteer</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerRoles.map((role) => (
              <div key={role.id} className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center hover:border-[#003A99] transition-colors">
                <div className="text-[#003A99] flex justify-center mb-3">{role.icon}</div>
                <h3 className="font-bold text-[#1A1A1A]">{role.title}</h3>
                <p className="text-sm text-[#4A4F59]">{role.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-[#4A4F59]">Time commitment: From 4 hours a month. We train you.</p>
            <p className="text-sm text-[#4A4F59] mt-1">Background check required. Passion for girls' education.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
              <div className="bg-[#1A7F00] text-white p-6 mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-white/80 mt-2">Your volunteer application has been submitted. OGOP will contact you shortly.</p>
              </div>
              <Link href="/" className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors">
                Return Home
              </Link>
            </div>
          ) : (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Apply to <span className="text-[#003A99]">Volunteer</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    placeholder="City, Country (or Remote)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">What skills can you offer?</label>
                  <select
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                  >
                    <option value="">Select your primary skill...</option>
                    <option value="Teaching/Tutoring">Teaching/Tutoring</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Photography">Photography</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Legal">Legal</option>
                    <option value="Medical/Health">Medical/Health</option>
                    <option value="Event Planning">Event Planning</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="e.g., Weekends, Evenings, Flexible"
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Why do you want to volunteer?</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                    placeholder="Tell us why you'd like to volunteer with OGOP..."
                  />
                </div>

                {error && (
                  <div className="bg-[#E31E24] text-white px-4 py-2 text-center text-sm">
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
                    'Submit Volunteer Application'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
