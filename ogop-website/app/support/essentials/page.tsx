import Link from 'next/link'
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react'

export default function EssentialsPage() {
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
              <span className="text-2xl mb-2 block">🛒</span>
              <p className="font-medium text-[#1A1A1A]">Groceries</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <span className="text-2xl mb-2 block">🧴</span>
              <p className="font-medium text-[#1A1A1A]">Personal Care</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <span className="text-2xl mb-2 block">👕</span>
              <p className="font-medium text-[#1A1A1A]">Clothing</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <span className="text-2xl mb-2 block">📚</span>
              <p className="font-medium text-[#1A1A1A]">School Supplies</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <span className="text-2xl mb-2 block">🩸</span>
              <p className="font-medium text-[#1A1A1A]">Sanitary Products</p>
            </div>
            <div className="border border-[#E0E2E6] p-4 bg-[#F8F9FA] text-center">
              <span className="text-2xl mb-2 block">🏥</span>
              <p className="font-medium text-[#1A1A1A]">Health Items</p>
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
              Your contribution helps cover essential needs for girls returning to school.
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Monthly Essentials</span>
                <span className="font-bold text-[#003A99]">$20</span>
              </div>
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Term Essentials</span>
                <span className="font-bold text-[#003A99]">$60</span>
              </div>
              <div className="flex justify-between items-center border border-[#E0E2E6] p-3 bg-[#F8F9FA]">
                <span className="font-medium text-[#1A1A1A]">Year Essentials</span>
                <span className="font-bold text-[#003A99]">$200</span>
              </div>
            </div>
            <Link
              href="/support/donate"
              className="inline-block mt-6 bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
            >
              Support Essentials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
