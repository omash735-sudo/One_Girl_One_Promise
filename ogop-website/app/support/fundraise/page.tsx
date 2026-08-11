'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Megaphone, CheckCircle, Target, Users, Calendar } from 'lucide-react'

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
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Form submission logic here
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
          <
