'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, CheckCircle, Plus, Minus } from 'lucide-react'

export default function SuppliesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    itemType: '',
    quantity: '',
    condition: 'new',
    deliveryMethod: 'pickup',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Form submission logic here
  }

  const supplyItems = [
    'School Uniforms',
    'School Bags',
    'Books & Stationery',
    'Sanitary Products',
    'Groceries',
    'Educational Materials',
    'Clothing',
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
          <Package className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Donate <span className="text-[#FFEB00]">Supplies</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your donation of school supplies, uniforms, sanitary products, and other essentials helps girls stay in school.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* What We Need */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            Items We <span className="text-[#003A99]">Need</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {supplyItems.slice(0, 7).map((item) => (
              <div key={item} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center text-sm font-medium text-[#1A1A1A]">
                {item}
              </div>
            ))}
          </div>
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
                  <p className="text-white/80">Someone from OGOP will contact you shortly to arrange your donation.</p>
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
                  Tell Us About Your <span className="text-[#003A99]">Donation</span>
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
                    <input
                      type="text"
                      name="location"
                      placeholder="Your Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                  </div>

                  <select
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                  >
                    <option value="">Select item you'd like to donate</option>
                    {supplyItems.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="quantity"
                      placeholder="Quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                    />
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                    >
                      <option value="new">New</option>
                      <option value="good">Good Condition</option>
                      <option value="used">Used but Usable</option>
                    </select>
                  </div>

                  <select
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                  >
                    <option value="pickup">I can deliver/arrange pickup</option>
                    <option value="dropoff">I prefer to drop off</option>
                    <option value="arrange">Need to arrange delivery</option>
                  </select>

                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Additional notes or questions..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors"
                  >
                    Submit Donation Offer
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
