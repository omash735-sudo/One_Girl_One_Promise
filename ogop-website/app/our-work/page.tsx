import Link from 'next/link'
import { ArrowLeft, Briefcase, GraduationCap, Heart, Users } from 'lucide-react'

export default function OurWorkPage() {
  const programs = [
    {
      icon: <GraduationCap className="w-8 h-8 text-[#003A99]" />,
      title: 'Back-to-School Program',
      description: 'Payment of school fees and provision of learning materials to enable teen mothers to return and stay in school.'
    },
    {
      icon: <Heart className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Psychological Rehabilitation',
      description: 'Christian-based counselling for teen mothers and survivors of sexual abuse, helping them heal and regain confidence.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#003A99]" />,
      title: 'Parental & Community Sensitization',
      description: 'Workshops on sex education and child rights for parents, guardians, and community members.'
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Skills Development Program',
      description: 'Vocational training in tailoring, baking, and entrepreneurship to promote self-sustainability.'
    }
  ]

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
          <Briefcase className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#FFEB00]">Work</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover the programs and initiatives that are transforming the lives of teen mothers in Malawi.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            Our <span className="text-[#003A99]">Programs</span>
          </h2>
          <p className="text-[#4A4F59] text-center mb-12 max-w-2xl mx-auto">
            Comprehensive support to empower teen mothers and transform their futures.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="border border-[#E0E2E6] p-6 bg-white hover:border-[#003A99] transition-colors"
              >
                <div className="mb-4">{program.icon}</div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{program.title}</h3>
                <p className="text-sm text-[#4A4F59]">{program.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/support" 
              className="inline-block bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
            >
              Support Our Work →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
