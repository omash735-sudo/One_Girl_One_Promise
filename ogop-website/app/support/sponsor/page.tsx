'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  EyeOff,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Need {
  id: number
  item_name: string
  description: string
  amount_mk: number
  amount_usd: number
  is_fulfilled: boolean
}

interface Girl {
  id: number
  name: string
  age: number
  location: string
  school: string
  grade: string
  dream: string
  story: string
  image_url: string
  needs: Need[]
}

export default function SponsorPage() {
  const searchParams = useSearchParams()
  const [girls, setGirls] = useState<Girl[]>([])
  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [selectedNeed, setSelectedNeed] = useState<string>('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const girlId = searchParams.get('id')
    loadGirls(girlId)
  }, [searchParams])

  const loadGirls = async (girlId: string | null) => {
    try {
      setLoading(true)
      
      if (girlId) {
        const res = await fetch(`/api/girls?id=${girlId}`)
        const data = await res.json()
        setSelectedGirl(data)
        setGirls([data])
      } else {
        const res = await fetch('/api/girls?featured=true')
        const data = await res.json()
        setGirls(data)
        if (data.length > 0) {
          setSelectedGirl(data[0])
        }
      }
    } catch (err) {
      setError('Failed to load girls')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const selectedNeedObj = selectedGirl?.needs?.find(n => n.id.toString() === selectedNeed)

    try {
      const res = await fetch('/api/support/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donorName,
          email: donorEmail,
          phone: phone,
          girlId: selectedGirl?.id,
          girlName: selectedGirl?.name,
          need: selectedNeedObj?.item_name || 'General Sponsorship',
          amount: selectedNeedObj?.amount_usd || 0,
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
        setSelectedNeed('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const selectGirl = (girl: Girl) => {
    setSelectedGirl(girl)
    setSelectedNeed('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#003A99] animate-spin" />
      </div>
    )
  }

  if (girls.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">No girls available</h2>
          <p className="text-[#4A4F59] mt-2">Check back soon for sponsorship opportunities.</p>
          <Link href="/support" className="inline-block mt-4 text-[#003A99] font-medium hover:underline">
            Back to Support
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link 
          href="/support" 
          className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Support
        </Link>
      </div>

      <section className="bg-[#003A99] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-[#FFEB00] text-[#1A1A1A] px-3 py-1 text-sm font-bold mb-4">
                Sponsor a Girl
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sponsor a <span className="text-[#FFEB00]">Girl's Education</span>
              </h1>
              <p className="text-lg text-white/80">
                Help a teen mother return to school and pursue her dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Girl Selection */}
      {girls.length > 1 && (
        <section className="py-8 bg-white border-b border-[#E0E2E6]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Choose a girl to sponsor:</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {girls.map((girl) => (
                <button
                  key={girl.id}
                  onClick={() => selectGirl(girl)}
                  className={`flex-shrink-0 px-6 py-3 font-medium transition-colors ${
                    selectedGirl?.id === girl.id
                      ? 'bg-[#003A99] text-white'
                      : 'border border-[#E0E2E6] bg-white text-[#1A1A1A] hover:border-[#003A99]'
                  }`}
                >
                  {girl.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedGirl && (
        <>
          <section className="py-12 bg-white border-b border-[#E0E2E6]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-[3/4] bg-[#F8F9FA] border border-[#E0E2E6] flex items-center justify-center overflow-hidden relative">
                    {selectedGirl.image_url ? (
                      <img 
                        src={selectedGirl.image_url} 
                        alt={selectedGirl.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-[#4A4F59]">
                        <User className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm">No photo available</p>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-[#1A1A1A]/80 text-white text-xs px-2 py-1 flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      <span>Privacy protected</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                    Meet <span className="text-[#003A99]">{selectedGirl.name}</span>
                  </h2>
                  <div className="space-y-3 text-[#4A4F59]">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">Name:</span> {selectedGirl.name}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">Age:</span> {selectedGirl.age} years</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">Location:</span> {selectedGirl.location}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">School:</span> {selectedGirl.school}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-[#003A99] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">Grade:</span> {selectedGirl.grade}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-[#1A7F00] mt-1 flex-shrink-0" />
                      <div><span className="font-medium text-[#1A1A1A]">Dream:</span> {selectedGirl.dream}</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#F8F9FA] p-4 border border-[#E0E2E6]">
                    <h3 className="font-bold text-[#1A1A1A] mb-2">Her Story</h3>
                    <p className="text-sm text-[#4A4F59]">{selectedGirl.story}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-[#F8F9FA] border-b border-[#E0E2E6]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-center text-[#1A1A1A] mb-4">
                What <span className="text-[#003A99]">{selectedGirl.name}</span> Needs
              </h2>
              <p className="text-[#4A4F59] text-center mb-8 max-w-2xl mx-auto">
                Help her return to school by covering the costs below.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedGirl.needs?.map((need) => {
                  const total = selectedGirl.needs?.reduce((sum, n) => sum + n.amount_usd, 0) || 0
                  return (
                    <div 
                      key={need.id} 
                      className={`border p-4 bg-white ${
                        need.is_fulfilled ? 'border-[#1A7F00] bg-[#F8F9FA]' : 'border-[#E0E2E6]'
                      }`}
                    >
                      <div className="text-2xl font-bold text-[#003A99]">${need.amount_usd}</div>
                      <div className="text-sm text-[#4A4F59]">MK {need.amount_mk.toLocaleString()}</div>
                      <div className="text-sm font-medium text-[#1A1A1A] mt-1">{need.item_name}</div>
                      <div className="text-xs text-[#4A4F59] mt-1">{need.description}</div>
                      {need.is_fulfilled && (
                        <div className="mt-2 bg-[#1A7F00] text-white text-xs font-bold px-2 py-1 inline-block">Fulfilled</div>
                      )}
                    </div>
                  )
                })}
                <div className="border border-[#FFEB00] p-4 bg-[#FFEB00]/5">
                  <div className="text-2xl font-bold text-[#003A99]">
                    ${selectedGirl.needs?.reduce((sum, n) => sum + n.amount_usd, 0) || 0}
                  </div>
                  <div className="text-sm text-[#4A4F59]">
                    MK {selectedGirl.needs?.reduce((sum, n) => sum + n.amount_mk, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-[#1A7F00] mt-1">Total Needed</div>
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
                    <p className="text-white/80 mt-2">Your sponsorship inquiry for {selectedGirl.name} has been submitted. OGOP will contact you shortly.</p>
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
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Sponsor <span className="text-[#003A99]">{selectedGirl.name}</span>
                  </h3>
                  <p className="text-sm text-[#4A4F59] mb-4">
                    Fill in your details and we'll connect you with OGOP to complete your sponsorship.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-1">What would you like to sponsor?</label>
                      <select
                        value={selectedNeed}
                        onChange={(e) => setSelectedNeed(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99] bg-white"
                      >
                        <option value="">Select an item...</option>
                        {selectedGirl.needs?.map((need) => (
                          <option key={need.id} value={need.id}>
                            {need.item_name} - ${need.amount_usd}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        `Sponsor ${selectedGirl.name}`
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>
        </>
      )}

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
