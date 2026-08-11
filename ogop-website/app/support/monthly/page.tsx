import Link from 'next/link'
import { ArrowLeft, CalendarHeart, CheckCircle, Heart } from 'lucide-react'

export default function MonthlyPage() {
  const monthlyTiers = [
    {
      amount: '$5',
      impact: 'Provides learning materials for one student'
    },
    {
      amount: '$10',
      impact: 'Covers transportation for two students'
    },
    {
      amount: '$25',
      impact: 'Supplies a student with a uniform and books'
    },
    {
      amount: '$50',
      impact: 'Provides counselling sessions for five students'
    },
    {
      amount: '$100',
      impact: 'Sponsors a student\'s monthly school fees'
    }
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
      <section className="bg-[#003A99] text-white py-16 md:py-20">
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
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-bold text-[#1A1A1A]">Predictable Support</h3>
              <p className="text-sm text-[#4A4F59]">Allows OGOP to plan programs and budget effectively</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="font-bold text-[#1A1A1A]">Sustained Impact</h3>
              <p className="text-sm text-[#4A4F59]">Provides ongoing support for girls throughout their education</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold text-[#1A1A1A]">Community Building</h3>
              <p className="text-sm text-[#4A4F59]">Join a committed group of supporters making a lasting difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            Choose Your <span className="text-[#003A99]">Monthly Commitment</span>
          </h2>
          <p className="text-[#4A4F59] text-center mb-12">
            Select an amount that works for you. Every monthly gift creates lasting change.
          </p>

          <div className="space-y-4">
            {monthlyTiers.map((tier, index) => (
              <div 
                key={index}
                className="border border-[#E0E2E6] p-4 md:p-6 bg-white flex flex-col md:flex-row items-center justify-between hover:border-[#003A99] transition-colors"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <CheckCircle className="w-5 h-5 text-[#1A7F00] flex-shrink-0" />
                  <div>
                    <span className="text-2xl font-bold text-[#003A99]">{tier.amount}</span>
                    <span className="text-sm text-[#4A4F59] ml-2">/ month</span>
                  </div>
                </div>
                <p className="text-sm text-[#4A4F59] my-2 md:my-0">{tier.impact}</p>
                <Link
                  href="/support/donate"
                  className="block bg-[#1A7F00] text-white px-6 py-2 font-bold hover:bg-[#136000] transition-colors text-sm w-full md:w-auto text-center"
                >
                  Select
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/support/donate"
              className="inline-block bg-[#003A99] text-white px-8 py-3 font-bold hover:bg-[#002A70] transition-colors"
            >
              Custom Monthly Amount →
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Note */}
      <section className="py-12 bg-[#003A99] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-[#FFEB00] mx-auto mb-4" />
          <p className="text-lg font-medium">
            "Yes, I Can Become"
          </p>
          <p className="text-sm text-white/70 mt-2">OGOP Motto</p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-4" />
          <p className="mt-4 text-white/80">
            Your monthly support helps young mothers believe in themselves and their future.
          </p>
        </div>
      </section>
    </div>
  )
}
