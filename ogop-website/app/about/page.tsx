import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-[#003A99] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-[#FFEB00]">OGOP</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            One Girl One Promise - Transforming lives through education and compassion.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E0E2E6] p-6 md:p-8 bg-white">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
              Who <span className="text-[#003A99]">We Are</span>
            </h2>
            <p className="text-[#4A4F59] leading-relaxed mb-6">
              One Girl One Promise (OGOP) is a non-governmental organization founded on Godly principles, based in Malawi. Founded in 2023, OGOP is committed to restoring hope and opportunity to teenage mothers from underprivileged rural communities.
            </p>
            
            <h3 className="text-xl font-bold text-[#1A1A1A] mt-6 mb-3">
              Our <span className="text-[#003A99]">Vision</span>
            </h3>
            <p className="text-[#4A4F59] leading-relaxed mb-6">
              A Malawi where every teen mother has the opportunity to return to school, achieve her dreams, and contribute meaningfully to society.
            </p>
            
            <h3 className="text-xl font-bold text-[#1A1A1A] mt-6 mb-3">
              Our <span className="text-[#1A7F00]">Mission</span>
            </h3>
            <p className="text-[#4A4F59] leading-relaxed mb-6">
              To empower teen mothers from underprivileged communities by providing educational support, psychological and spiritual rehabilitation, and skills development, enabling them to reintegrate into school and lead dignified lives.
            </p>
            
            <div className="bg-[#003A99] text-white p-4 mt-6">
              <p className="text-sm font-medium">
                "Instead of your shame there shall be a double portion; instead of dishonor they shall rejoice in their lot; therefore in their land they shall possess a double portion; they shall have everlasting joy."
              </p>
              <p className="text-xs text-white/70 mt-1">Isaiah 61:7</p>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/support" 
                className="inline-block bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
              >
                Support Our Mission →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
