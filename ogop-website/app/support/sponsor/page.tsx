'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  User, 
  Calendar,
  MapPin,
  Heart,
  CheckCircle,
  Loader2,
  EyeOff
} from 'lucide-react'

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string>('full')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const girlData = {
    id: 'BRENDA-001',
    name: 'Brenda Majeza',
    age: 17,
    location: 'Lundu Village, Malawi',
    school: 'Namikasi Secondary School',
    grade: 'Form One',
    dream: 'To become a Doctor',
    story: 'Brenda is a single orphan who lost her mother at age 9. She dropped out of school after becoming pregnant. Despite walking 50 kilometers to school daily and surviving an attack, she remains determined to complete her education and become a Doctor.',
    image: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786456115/Gemini_Generated_Image_rote8brote8brote_bfnme4.png',
    status: 'Currently in school with OGOP support'
  }

  const sponsorshipTiers = [
    {
      id: 'uniform',
      title: 'Uniform + Shoes',
      amount: '$78',
      mkAmount: 'MK 350,000',
      description: 'Provides a school uniform and shoes for one semester',
      features: ['School uniform', 'School shoes', 'Lasts for one semester']
    },
    {
      id: 'books',
      title: 'Books + Stationery',
      amount: '$67',
      mkAmount: 'MK 300,000',
      description: 'Provides books and stationery for one semester',
      features: ['Textbooks', 'Exercise books', 'Stationery items']
    },
    {
      id: 'full',
      title: 'Full School Kit',
      amount: '$89',
      mkAmount: 'MK 400,000',
      description: 'Complete school kit for one teen mother',
      features: ['Full school uniform', 'Books and stationery', 'Hygiene items', 'School bag']
    },
    {
      id: 'complete',
      title: 'Sponsor Brenda',
      amount: '$233',
      mkAmount: 'MK 1,050,000',
      description: 'Sponsor Brenda\'s entire education for this year',
      features: ['All school fees', 'Uniform and shoes', 'Books and stationery', 'Hygiene items', 'Transportation support', 'Housing support']
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
          message: message,
          girlId: girlData.id,
          girlName: girlData.name
        })
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setDonorName('')
        setDonorEmail('')
        setPhone('')
        setMessage('')
        setSelectedTier('full')
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-[#FFEB00] text-[#1A1A1A] px-3 py-1 text-sm font-bold mb-4">
                Sponsor a Girl
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sponsor <span className="text-[#FFEB00]">Brenda's</span> Education
              </h1>
              <p className="text-lg text-white/80">
                Help a 17-year-old teen mother return to school and pursue her dream of becoming a Doctor.
              </p>
            </div>
            <div className="bg-white/10 p-4 border border-white/20 relative">
              <img 
                src={girlData.image}
                alt="Brenda and her child"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#1A1A1A]/80 text-white text-xs px-2 py-1 flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                <span>Privacy protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brenda's Story */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                Meet <span className="text-[#003A99]">Brenda</span>
              </h2>
              <div className="space-y-3 text-[#4A4F59]">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">Name:</span> {girlData.name}</div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">Age:</span> {girlData.age} years</div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">Location:</span> {girlData.location}</div>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">School:</span> {girlData.school}</div>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">Grade:</span> {girlData.grade}</div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-[#1A7F00] mt-1 flex-shrink-0" />
                  <div><span className="font-medium text-[#1A1A1A]">Dream:</span> {girlData.dream}</div>
                </div>
              </div>
            </div>
            <div className="bg-[#F8F9FA] p-6 border border-[#E0E2E6]">
              <h3 className="font-bold text-[#1A1A1A] mb-3">Brenda's Story</h3>
              <p className="text-[#4A4F59] text-sm leading-relaxed mb-4">
                {girlData.story}
              </p>
              <div className="bg-[#003A99] text-white p-4">
                <p className="text-sm font-medium">"Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers."</p>
                <p className="text-xs text-white/70 mt-1">Galatians 6:10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What She Needs */}
      <section className="py-12 bg-[#F8F9FA] border-b border-[#E0E2E6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-[#1A1A1A] mb-4">
            What Brenda <span className="text-[#003A99]">Needs</span>
          </h2>
          <p className="text-[#4A4F59] text-center mb-8 max-w-2xl mx-auto">
            Help One Teen Mom Back to School Today. We need MK 1,050,000 (~$233 USD) to send Brenda to school.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border border-[#E0E2E6] p-4 bg-white text-center">
              <div className="text-2xl font-bold text-[#003A99]">MK 350,000</div>
              <div className="text-sm text-[#4A4F59]">~$78 USD</div>
              <div className="text-xs font-medium text-[#1A1A1A] mt-1">Uniform + Shoes</div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-white text-center">
              <div className="text-2xl font-bold text-[#003A99]">MK 300,000</div>
              <div className="text-sm text-[#4A4F59]">~$67 USD</div>
              <div className="text-xs font-medium text-[#1A1A1A] mt-1">Books + Stationery</div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-white text-center">
              <div className="text-2xl font-bold text-[#003A99]">MK 400,000</div>
              <div className="text-sm text-[#4A4F59]">~$89 USD</div>
              <div className="text-xs font-medium text-[#1A1A1A] mt-1">Full School Kit</div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#FFEB00]/10 text-center">
              <div className="text-2xl font-bold text-[#003A99]">MK 1,050,000</div>
              <div className="text-sm text-[#4A4F59]">~$233 USD</div>
              <div className="text-xs font-medium text-[#1A7F00] mt-1">Total Needed</div>
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
                <p className="text-white/80 mt-2">Your sponsorship inquiry for Brenda has been submitted. OGOP will contact you shortly.</p>
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
                  Choose How to <span className="text-[#003A99]">Sponsor Brenda</span>
                </h2>
                <p className="text-[#4A4F59] mb-6">
                  Select what you'd like to provide for Brenda. Every contribution makes a difference.
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
                            <div className="text-xs text-[#4A4F59] mt-1">{tier.mkAmount}</div>
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
                  Sponsor <span className="text-[#003A99]">Brenda</span>
                </h3>
                <p className="text-sm text-[#4A4F59] mb-4">
                  Fill in your details and we'll connect you with OGOP to complete your sponsorship.
                </p>
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
                      `Sponsor Brenda Now`
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
