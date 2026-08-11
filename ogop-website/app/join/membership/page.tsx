'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  User, 
  Users, 
  Building, 
  GraduationCap,
  CheckCircle,
  Loader2,
  Home,
  BarChart,
  Award
} from 'lucide-react'

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const membershipTiers = [
    {
      id: 'student',
      title: 'Fellow Student',
      fee: 'MK 10,000',
      whoFor: 'Students 18-25',
      benefits: ['Automatic volunteer', 'Access to events', 'Monthly updates'],
      icon: <GraduationCap className="w-8 h-8 text-[#003A99]" />
    },
    {
      id: 'individual',
      title: 'Individual Member',
      fee: 'MK 40,000',
      whoFor: 'Any Adult',
      benefits: ['Get events invites', 'Quarterly impact reports', 'Access to OGOP house'],
      icon: <User className="w-8 h-8 text-[#003A99]" />
    },
    {
      id: 'family',
      title: 'Family Membership',
      fee: 'MK 100,000',
      whoFor: 'Couple/Family',
      benefits: ['Get events invites', 'Participate in planning', 'Recognition in communications'],
      icon: <Users className="w-8 h-8 text-[#003A99]" />
    },
    {
      id: 'corporate',
      title: 'Corporate Member',
      fee: 'MK 500,000',
      whoFor: 'Institutions',
      benefits: ['Recognition in all formal communications', 'Brand visibility', 'Impact reports'],
      icon: <Building className="w-8 h-8 text-[#003A99]" />
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/join/membership', {
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
          category: '',
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
            Become a <span className="text-[#FFEB00]">Member</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join the OGOP community and help restore hope and education to teen mothers in Malawi.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Why Become a <span className="text-[#003A99]">Member?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA]">
              <Home className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Visit OGOP House</h3>
              <p className="text-sm text-[#4A4F59]">Once every semester</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA]">
              <BarChart className="w-12 h-12 text-[#1A7F00] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Track Progress</h3>
              <p className="text-sm text-[#4A4F59]">Access academic performance</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA]">
              <Award className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Be Recognized</h3>
              <p className="text-sm text-[#4A4F59]">In all OGOP communications</p>
            </div>
          </div>
          <div className="mt-6 bg-[#FFEB00] p-4 text-[#1A1A1A]">
            <p className="text-sm font-medium">
              "And do not forget to do good and to share with others, for with such sacrifices God is pleased."
            </p>
            <p className="text-xs mt-1">Hebrews 13:16</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            Choose Your <span className="text-[#003A99]">Membership</span>
          </h2>
          <p className="text-[#4A4F59] text-center mb-12 max-w-2xl mx-auto">
            Select the membership category that fits you best.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {membershipTiers.map((tier) => (
              <div 
                key={tier.id}
                className="border border-[#E0E2E6] p-6 bg-white hover:border-[#003A99] transition-colors"
              >
                <div className="mb-4">{tier.icon}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{tier.title}</h3>
                <div className="text-2xl font-bold text-[#003A99] my-2">{tier.fee}</div>
                <p className="text-sm text-[#4A4F59] mb-3">{tier.whoFor}</p>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#4A4F59]">
                      <CheckCircle className="w-4 h-4 text-[#1A7F00] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth' })
                    setFormData({ ...formData, category: tier.title })
                  }}
                  className="w-full bg-[#1A7F00] text-white py-2 font-bold hover:bg-[#136000] transition-colors"
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          <div id="membership-form" className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
                <div className="bg-[#1A7F00] text-white p-6 mb-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">Application Submitted!</h3>
                  <p className="text-white/80 mt-2">Welcome to the OGOP community. We'll be in touch shortly.</p>
                </div>
                <Link href="/" className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors">
                  Return Home
                </Link>
              </div>
            ) : (
              <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                  Apply for <span className="text-[#003A99]">Membership</span>
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
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Email Address</label>
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
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Membership Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                    >
                      <option value="">Select a category...</option>
                      {membershipTiers.map((tier) => (
                        <option key={tier.id} value={tier.title}>
                          {tier.title} - {tier.fee}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Why do you want to join?</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                      placeholder="Tell us why you'd like to become a member..."
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
                      'Apply for Membership'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#003A99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Membership Fee Payment</h3>
          <p className="text-white/80 mb-6">Pay via Mobile Money or Bank Transfer</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 p-4 border border-white/20">
              <h4 className="font-bold">Mobile Money</h4>
              <p className="text-sm text-white/70">Airtel Money: 0983711922</p>
              <p className="text-xs text-white/60 mt-1">Reference: Membership + Your Name</p>
            </div>
            <div className="bg-white/10 p-4 border border-white/20">
              <h4 className="font-bold">Bank Transfer</h4>
              <p className="text-sm text-white/70">National Bank</p>
              <p className="text-sm text-white/70">Account: 1010918428</p>
              <p className="text-xs text-white/60 mt-1">Reference: Membership + Your Name</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
