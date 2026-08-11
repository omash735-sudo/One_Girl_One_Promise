'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ShoppingBag, 
  CheckCircle, 
  Loader2,
  Heart,
  Shirt,
  BookOpen,
  Droplets,
  Pill
} from 'lucide-react'

export default function EssentialsPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('60')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const essentialsOptions = [
    { amount: '20', label: 'Monthly Essentials' },
    { amount: '60', label: 'Term Essentials' },
    { amount: '200', label: 'Year Essentials' }
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
          frequency: 'one-time',
          paymentMethod: 'PayPal',
          isAnonymous: isAnonymous
        })
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setDonorName('')
        setDonorEmail('')
        setSelectedAmount('60')
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
          <ShoppingBag className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Support <span className="text-[#FFEB00]">Essential Needs</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Help cover groceries, personal necessities, and basic living expenses that enable girls to focus on their education.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* What's Covered */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            What <span className="text-[#003A99]">Essential Needs</span> Cover
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <ShoppingBag className="w-8 h-8 text-[#003A99] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">Groceries</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <Heart className="w-8 h-8 text-[#1A7F00] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">Personal Care</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <Shirt className="w-8 h-8 text-[#003A99] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">Clothing</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <BookOpen className="w-8 h-8 text-[#1A7F00] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">School Supplies</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <Droplets className="w-8 h-8 text-[#003A99] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">Sanitary Products</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <Pill className="w-8 h-8 text-[#1A7F00] mx-auto mb-2" />
              <p className="font-medium text-[#1A1A1A]">Health Items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-[#1A7F00] text-white p-6 mb-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-white/80 mt-2">Your support helps cover essential needs for girls returning to school.</p>
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
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-4">
                  Make a <span className="text-[#003A99]">Donation</span>
                </h2>
                <p className="text-[#4A4F59] text-center mb-6">
                  Your contribution helps cover essential needs for girls returning to school.
                </p>

                <div className="space-y-3 max-w-xs mx-auto mb-6">
                  {essentialsOptions.map((option) => (
                    <div 
                      key={option.amount}
                      className={`flex justify-between items-center border p-3 cursor-pointer transition-colors ${
                        selectedAmount === option.amount 
                          ? 'border-[#003A99] bg-[#F8F9FA]' 
                          : 'border-[#E0E2E6] hover:border-[#003A99]'
                      }`}
                      onClick={() => setSelectedAmount(option.amount)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="essentialsAmount"
                          value={option.amount}
                          checked={selectedAmount === option.amount}
                          onChange={() => setSelectedAmount(option.amount)}
                          className="w-4 h-4 accent-[#003A99]"
                        />
                        <span className="font-medium text-[#1A1A1A]">{option.label}</span>
                      </div>
                      <span className="font-bold text-[#003A99]">${option.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required={!isAnonymous}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required={!isAnonymous}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-[#003A99]"
                    />
                    <span className="text-sm text-[#4A4F59]">Donate anonymously</span>
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
                    'Support Essentials'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
