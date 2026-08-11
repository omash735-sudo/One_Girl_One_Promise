'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  CalendarHeart, 
  CheckCircle, 
  Loader2,
  ClipboardList,
  Shield,
  Users
} from 'lucide-react'

export default function MonthlyPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('25')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const monthlyTiers = [
    { amount: '5', impact: 'Provides learning materials for one student' },
    { amount: '10', impact: 'Covers transportation for two students' },
    { amount: '25', impact: 'Supplies a student with a uniform and books' },
    { amount: '50', impact: 'Provides counselling sessions for five students' },
    { amount: '100', impact: 'Sponsors a student\'s monthly school fees' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/support/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: isAnonymous ? 'Anonymous' : donorName || 'Anonymous',
          donorEmail: isAnonymous ? 'anonymous@donor.com' : donorEmail || 'anonymous@donor.com',
          amount: parseFloat(selectedAmount),
          frequency: 'monthly',
          paymentMethod: 'PayPal',
          isAnonymous: isAnonymous
        })
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setDonorName('')
        setDonorEmail('')
        setSelectedAmount('25')
        setIsAnonymous(false)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

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
          <CalendarHeart className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Give <span className="text-[#FFEB00]">Monthly</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Become a monthly supporter and provide consistent, predictable support that helps OGOP plan and sustain its programs year-round.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* Why Monthly */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            Why <span className="text-[#003A99]">Monthly Giving</span> Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <ClipboardList className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Predictable Support</h3>
              <p className="text-sm text-[#4A4F59]">Allows OGOP to plan programs and budget effectively</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Shield className="w-12 h-12 text-[#1A7F00] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Sustained Impact</h3>
              <p className="text-sm text-[#4A4F59]">Provides ongoing support for girls throughout their education</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Users className="w-12 h-12 text-[#003A99] mx-auto mb-2" />
              <h3 className="font-bold text-[#1A1A1A]">Community Building</h3>
              <p className="text-sm text-[#4A4F59]">Join a committed group of supporters making a lasting difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
              <div className="bg-[#1A7F00] text-white p-6 mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-white/80 mt-2">You're now a monthly supporter of OGOP.</p>
                <p className="text-white/60 text-sm mt-4">A confirmation has been sent to your email.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors">
                  Return Home
                </Link>
                <Link href="/support" className="inline-block border-2 border-[#003A99] text-[#003A99] px-6 py-3 font-bold hover:bg-[#003A99] hover:text-white transition-colors">
                  Support More
                </Link>
              </div>
            </div>
          ) : (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
              <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-4">
                Choose Your <span className="text-[#003A99]">Monthly Commitment</span>
              </h2>
              <p className="text-[#4A4F59] text-center mb-8">
                Select an amount that works for you. Every monthly gift creates lasting change.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-8">
                  {monthlyTiers.map((tier) => (
                    <div 
                      key={tier.amount}
                      className={`border p-4 md:p-6 flex flex-col md:flex-row items-center justify-between cursor-pointer transition-colors ${
                        selectedAmount === tier.amount 
                          ? 'border-[#003A99] bg-[#F8F9FA]' 
                          : 'border-[#E0E2E6] hover:border-[#003A99]'
                      }`}
                      onClick={() => setSelectedAmount(tier.amount)}
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <input
                          type="radio"
                          name="amount"
                          value={tier.amount}
                          checked={selectedAmount === tier.amount}
                          onChange={() => setSelectedAmount(tier.amount)}
                          className="w-4 h-4 accent-[#003A99]"
                        />
                        <div>
                          <span className="text-2xl font-bold text-[#003A99]">${tier.amount}</span>
                          <span className="text-sm text-[#4A4F59] ml-2">/ month</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#4A4F59] my-2 md:my-0">{tier.impact}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-[#1A1A1A] mb-3">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required={!isAnonymous}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required={!isAnonymous}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-[#003A99]"
                    />
                    <span className="text-sm text-[#4A4F59]">Give anonymously</span>
                  </label>
                </div>

                {error && (
                  <div className="bg-[#E31E24] text-white px-4 py-3 mb-4 text-center text-sm">
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
                      Processing...
                    </>
                  ) : (
                    'Start Monthly Support'
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
