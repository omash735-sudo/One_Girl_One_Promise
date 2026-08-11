'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, CheckCircle, Loader2 } from 'lucide-react'

export default function HousingPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('90')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const EXCHANGE_RATE = 4500

  const housingOptions = [
    { amount: '30', label: 'Monthly Housing' },
    { amount: '90', label: 'Term Housing' },
    { amount: '300', label: 'Year Housing' }
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
        setSelectedAmount('90')
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
          <Home className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Support <span className="text-[#FFEB00]">Housing</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Provide safe accommodation for girls who cannot remain at home while pursuing their education.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* Exchange Rate Notice */}
      <div className="bg-[#FFEB00] text-[#1A1A1A] py-2 px-4 text-center text-sm font-medium">
        Exchange Rate: 1 USD ≈ 4,500 MK (Malawi Kwacha)
      </div>

      {/* Why It Matters */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            Why <span className="text-[#003A99]">Housing</span> Support Matters
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1A1A1A]">Safe Environment</h3>
                <p className="text-sm text-[#4A4F59]">Some girls cannot safely remain at home while attending school.</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1A1A1A]">Focus on Studies</h3>
                <p className="text-sm text-[#4A4F59]">Stable housing allows girls to concentrate on their education without worry.</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1A1A1A]">Community Support</h3>
                <p className="text-sm text-[#4A4F59]">Housing provides a supportive environment with access to counselling and resources.</p>
              </div>
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
                  <p className="text-white/80 mt-2">Your support helps provide safe housing for girls pursuing their education.</p>
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
                  Your contribution helps provide safe housing for girls pursuing their education.
                </p>

                <div className="space-y-3 max-w-xs mx-auto mb-6">
                  {housingOptions.map((option) => {
                    const mkAmount = Math.round(parseFloat(option.amount) * EXCHANGE_RATE)
                    return (
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
                            name="housingAmount"
                            value={option.amount}
                            checked={selectedAmount === option.amount}
                            onChange={() => setSelectedAmount(option.amount)}
                            className="w-4 h-4 accent-[#003A99]"
                          />
                          <div>
                            <span className="font-medium text-[#1A1A1A]">{option.label}</span>
                            <div className="text-xs text-[#4A4F59]">MK {mkAmount.toLocaleString()}</div>
                          </div>
                        </div>
                        <span className="font-bold text-[#003A99]">${option.amount}</span>
                      </div>
                    )
                  })}
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
                    'Support Housing'
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
