import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <section className="bg-[#003A99] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Research & <span className="text-[#FFEB00]">Publications</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Exploring solutions to empower teen mothers through education and community support.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white text-center">
            <p className="text-[#4A4F59]">Research publications and findings will be available here soon.</p>
            <p className="text-sm text-[#4A4F59] mt-2">Check back for updates on our research initiatives.</p>
            <div className="mt-6">
              <Link href="/support" className="inline-block bg-[#1A7F00] text-white px-6 py-2 font-bold hover:bg-[#136000] transition-colors">
                Support Our Work →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
