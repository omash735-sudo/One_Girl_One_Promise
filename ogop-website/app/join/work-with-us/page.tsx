'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Briefcase, 
  Mail, 
  CheckCircle,
  Loader2,
  Shield,
  Users,
  Globe
} from 'lucide-react'

export default function WorkWithUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/join/work', {
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
          position: '',
          experience: '',
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
          <Briefcase className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="text-[#FFEB00]">With Us</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join the OGOP team and help transform the lives of teen mothers in Malawi.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            What We <span className="text-[#003A99]">Value</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Shield className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Child-Safe</h3>
              <p className="text-sm text-[#4A4F59]">We prioritize the safety and well-being of every girl</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Users className="w-12 h-12 text-[#1A7F00] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Female-Led</h3>
              <p className="text-sm text-[#4A4F59]">Empowering women and girls through leadership</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Globe className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Community</h3>
              <p className="text-sm text-[#4A4F59]">Working together to create lasting change</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA] border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            <span className="text-[#003A99]">Open Positions</span>
          </h2>
          <div className="bg-white border border-[#E0E2E6] p-6 text-center">
            <p className="text-[#4A4F59]">There are currently no open positions.</p>
            <p className="text-sm text-[#4A4F59] mt-2">
              However, you can send us your CV for future roles. We are always looking for passionate individuals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
              <div className="bg-[#1A7F00] text-white p-6 mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Application Received!</h3>
                <p className="text-white/80 mt-2">Your CV has been submitted. We'll keep it on file for future opportunities.</p>
              </div>
              <Link href="/" className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors">
                Return Home
              </Link>
            </div>
          ) : (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Send Us Your <span className="text-[#003A99]">CV</span>
              </h3>
              <p className="text-sm text-[#4A4F59] mb-4">
                Even if there are no current vacancies, we'd love to hear from you. Send us your details and we'll keep you in mind for future roles.
              </p>
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
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Position of Interest</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., Program Officer, Communications, Finance"
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Experience & Qualifications</label>
                  <textarea
                    name="experience"
                    rows={3}
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                    placeholder="Briefly describe your experience and qualifications..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Why do you want to work with OGOP?</label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                    placeholder="Tell us why you'd like to join our team..."
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
                    'Submit Application'
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
