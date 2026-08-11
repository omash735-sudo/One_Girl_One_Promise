import Link from 'next/link'
import { ArrowLeft, Home, CheckCircle } from 'lucide-react'

export default function HousingPage() {
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
              Make a <span className="text-[#003A99]">Donation</span>
            </h2>
            <p className="text-[#4A4F59] mb-6">
              Your contribution helps provide safe housing for girls pursuing their education.
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Monthly Housing</span>
                <span className="font-bold text-[#003A99]">$30</span>
              </div>
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Term Housing</span>
                <span className="font-bold text-[#003A99]">$90</span>
              </div>
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Year Housing</span>
                <span className="font-bold text-[#003A99]">$300</span>
              </div>
            </div>
            <Link
              href="/support/donate"
              className="inline-block mt-6 bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
            >
              Support Housing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
