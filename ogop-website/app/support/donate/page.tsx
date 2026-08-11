'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, HeartHandshake, CheckCircle } from 'lucide-react'

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('25')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const presetAmounts = ['10', '25', '50', '100']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Payment integration would go here
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
          <HeartHandshake className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Make a <span className="text-[#FFEB00]">Donation</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your contribution helps provide education, counselling, and essential support to teen mothers in Malawi.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-[#1A7F00] text-white p-4 mb-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-white/80">Your donation is making a difference in the lives of young mothers.</p>
                </div>
                <Link 
                  href="/" 
                  className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  Choose Your <span className="text-[#003A99]">Donation</span>
                </h2>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block font-semibold text-[#1A1A1A] mb-3">
                    Donation Amount (USD)
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                        className={`py-2 font-bold transition-colors ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-[#003A99] text-white'
                            : 'border border-[#E0E2E6] text-[#1A1A1A] hover:border-[#003A99]'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#4A4F59] text-sm">Custom:</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount('')
                      }}
                      placeholder="Enter amount"
                      className="flex-1 px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#1A1A1A] mb-3">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>
                </div>

                {/* Anonymous Option */}
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

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#1A1A1A] mb-3">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="border border-[#E0E2E6] p-3 text-center hover:border-[#003A99] transition-colors"
                    >
                      <span className="font-medium">PayPal</span>
                    </button>
                    <button
                      type="button"
                      className="border border-[#E0E2E6] p-3 text-center hover:border-[#003A99] transition-colors"
                    >
                      <span className="font-medium">Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      className="border border-[#E0E2E6] p-3 text-center hover:border-[#003A99] transition-colors col-span-2"
                    >
                      <span className="font-medium">Mobile Money</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors"
                >
                  Donate Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
