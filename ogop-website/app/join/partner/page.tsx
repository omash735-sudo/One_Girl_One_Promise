'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Building, 
  Users, 
  Church, 
  School,
  Heart,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnerType: '',
    proposedPartnership: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const partnerTypes = [
    {
      id: 'school',
      title: 'School',
      icon: <School className="w-6 h-6" />,
      description: 'Re-admit teen mothers, provide flexible timetables, assign guidance teacher'
    },
    {
      id: 'church',
      title: 'Church/Community',
      icon: <Church className="w-6 h-6" />,
      description: 'Mobilization, mentorship, provide meeting space'
    },
    {
      id: 'corporate',
      title: 'Company/Corporate',
      icon: <Building className="w-6 h-6" />,
      description: 'CSR, school kits, pay term fees, internships'
    },
    {
      id: 'ngo',
      title: 'NGO',
      icon: <Heart className="w-6 h-6" />,
      description: 'Technical/referral partnership, health services, legal aid'
    },
    {
      id: 'government',
      title: 'Government/Health',
      icon: <Users className="w-6 h-6" />,
      description: 'Birth certificates, school placements, health checkups'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/join/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          partnerType: '',
          proposedPartnership: '',
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
            Partner <span className="text-[#FFEB00]">With Us</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Partner to keep teen moms in school. Together we can restore hope and education.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            How Institutions Can <span className="text-[#003A99]">Partner</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.id} className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center hover:border-[#003A99] transition-colors">
                <div className="text-[#003A99] flex justify-center mb-3">{type.icon}</div>
                <h3 className="font-bold text-[#1A1A1A]">{type.title}</h3>
                <p className="text-sm text-[#4A4F59]">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            How to <span className="text-[#003A99]">Become a Partner</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <div className="text-2xl font-bold text-[#003A99]">1</div>
              <h4 className="font-bold text-[#1A1A1A]">Express Interest</h4>
              <p className="text-sm text-[#4A4F59]">Fill the form or email us</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <div className="text-2xl font-bold text-[#003A99]">2</div>
              <h4 className="font-bold text-[#1A1A1A]">Meet & Discuss</h4>
              <p className="text-sm text-[#4A4F59]">We discuss your capacity</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <div className="text-2xl font-bold text-[#003A99]">3</div>
              <h4 className="font-bold text-[#1A1A1A]">Sign MoU</h4>
              <p className="text-sm text-[#4A4F59]">Simple agreement outlining roles</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <div className="text-2xl font-bold text-[#003A99]">4</div>
              <h4 className="font-bold text-[#1A1A1A]">Start & Report</h4>
              <p className="text-sm text-[#4A4F59]">Quarterly impact reports</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA] border-b border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            What You <span className="text-[#003A99]">Get</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-[#E0E2E6] p-4 bg-white flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Brand Visibility</h4>
                <p className="text-sm text-[#4A4F59]">Recognition in communications</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-white flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Impact Reports</h4>
                <p className="text-sm text-[#4A4F59]">Quarterly updates with photos</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-white flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Employee Engagement</h4>
                <p className="text-sm text-[#4A4F59]">Volunteer mentorship opportunities</p>
              </div>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-white flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1A1A1A]">Tax Benefits</h4>
                <p className="text-sm text-[#4A4F59]">Certificate of Partnership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
              <div className="bg-[#1A7F00] text-white p-6 mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-white/80 mt-2">Your partnership inquiry has been submitted. OGOP will contact you shortly.</p>
              </div>
              <Link href="/" className="inline-block bg-[#003A99] text-white px-6 py-3 font-bold hover:bg-[#002A70] transition-colors">
                Return Home
              </Link>
            </div>
          ) : (
            <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Become a <span className="text-[#003A99]">Partner</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
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
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Partner Type</label>
                  <select
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                  >
                    <option value="">Select partner type...</option>
                    {partnerTypes.map((type) => (
                      <option key={type.id} value={type.title}>{type.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">What can you offer?</label>
                  <textarea
                    name="proposedPartnership"
                    rows={3}
                    value={formData.proposedPartnership}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                    placeholder="Describe how you'd like to partner with OGOP..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Additional Information</label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] resize-vertical"
                    placeholder="Any other details..."
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
                    'Submit Partnership Inquiry'
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
