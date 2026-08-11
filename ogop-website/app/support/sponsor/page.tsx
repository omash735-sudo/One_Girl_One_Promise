'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  User, 
  Calendar, 
  MapPin,
  CheckCircle,
  Heart,
  Loader2
} from 'lucide-react'

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string>('monthly')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const sponsorshipTiers = [
    {
      id: 'monthly',
      title: 'Monthly Support',
      amount: '$25',
      description: 'Provide consistent monthly support for a girl\'s education and basic needs.',
      features: [
        'School fees contribution',
        'Learning materials',
        'Basic necessities'
      ]
    },
    {
      id: 'term',
      title: 'Term Sponsorship',
      amount: '$75',
      description: 'Cover a full school term including fees, supplies, and support services.',
      features: [
        'Full term school fees',
        'Uniform and books',
        'Counselling support',
        'Transportation'
      ]
    },
    {
      id: 'year',
      title: 'Year Sponsorship',
      amount: '$250',
      description: 'Sponsor a girl for an entire academic year.',
      features: [
        'Full year school fees',
        'Complete school supplies',
        'Regular counselling',
        'Transportation support',
        'Skills development'
      ]
    },
    {
      id: 'complete',
      title: 'Complete Education',
      amount: '$500',
      description: 'Support a girl through her entire secondary education journey.',
      features: [
        'All school fees',
        'All learning materials',
        'Full counselling support',
        'Skills training',
        'Mentorship program'
      ]
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const tier = sponsorshipTiers.find(t => t.id === selectedTier)

    try {
      const res = await fetch('/api/support/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donorName,
          email: donorEmail,
          phone: phone,
          tier: tier?.title || selectedTier,
          message: message
        })
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setDonorName('')
        setDonorEmail('')
        setPhone('')
        setMessage('')
        setSelectedTier('monthly')
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
          <GraduationCap className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Sponsor a Girl. <span className="text-[#FFEB00]">Change Her World.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your sponsorship provides a young mother with the opportunity to return to school, 
            rebuild her confidence, and create a brighter future.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* What Sponsorship Covers */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            What Your Sponsorship <span className="text-[#003A99]">Covers</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <BookOpen className="w-8 h-8 text-[#003A99] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Education</h3>
              <p className="text-sm text-[#4A4F59]">School fees, uniforms, books, and learning materials</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Heart className="w-8 h-8 text-[#1A7F00] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Support Services</h3>
              <p className="text-sm text-[#4A4F59]">Counselling, mentorship, and psychosocial support</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <User className="w-8 h-8 text-[#003A99] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Essential Needs</h3>
              <p className="text-sm text-[#4A4F59]">Transportation, housing, and basic necessities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers + Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="max-w-3xl mx-auto border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
              <div className="bg-[#1A7F00] text-white p-6 mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-white/80 mt-2">Your sponsorship inquiry has been submitted. OGOP will contact you shortly.</p>
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tiers */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  Choose Your <span className="text-[#003A99]">Sponsorship</span>
                </h2>
                <p className="text-[#4A4F59] mb-6">
                  Select the option that works best for you. Every contribution makes a difference.
                </p>
                <div className="space-y-4">
                  {sponsorshipTiers.map((tier) => (
                    <div 
                      key={tier.id}
                      className={`border p-4 cursor-pointer transition-colors ${
                        selectedTier === tier.id 
                          ? 'border-[#003A99] bg-[#F8F9FA]' 
                          : 'border-[#E0E2E6] hover:border-[#003A99]'
                      }`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="tier"
                            value={tier.id}
                            checked={selectedTier === tier.id}
                            onChange={() => setSelectedTier(tier.id)}
                            className="w-4 h-4 accent-[#003A99] mt-1"
                          />
                          <div>
                            <h3 className="font-bold text-[#1A1A1A]">{tier.title}</h3>
                            <p className="text-sm text-[#4A4F59]">{tier.description}</p>
                            <ul className="mt-2 space-y-1">
                              {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-[#4A4F59]">
                                  <CheckCircle className="w-3 h-3 text-[#1A7F00]" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-[#003A99] whitespace-nowrap ml-4">
                          {tier.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="border border-[#E0E2E6] p-6 bg-white">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                  Request <span className="text-[#003A99]">Sponsorship</span>
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                      placeholder="Any questions or special requests..."
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
                      'Request Sponsorship'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact Note */}
      <section className="py-12 bg-[#003A99] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">
            "Instead of your shame there shall be a double portion..."
          </p>
          <p className="text-sm text-white/70 mt-2">Isaiah 61:7</p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-4" />
          <p className="mt-4 text-white/80">
            Every sponsorship helps a young mother reclaim her education and build a future of hope.
          </p>
        </div>
      </section>
    </div>
  )
}
