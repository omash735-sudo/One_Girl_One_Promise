import Link from 'next/link'
import { 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  User, 
  Calendar, 
  MapPin,
  CheckCircle,
  Heart
} from 'lucide-react'

export default function SponsorPage() {
  const sponsorshipTiers = [
    {
      id: 'monthly',
      title: 'Monthly Support',
      amount: '$25',
      description: 'Provide consistent monthly support for a girl\'s education and basic needs.',
      features: [
        'School fees contribution',
        'Learning materials',
        'Basic necessities'
      ]
    },
    {
      id: 'term',
      title: 'Term Sponsorship',
      amount: '$75',
      description: 'Cover a full school term including fees, supplies, and support services.',
      features: [
        'Full term school fees',
        'Uniform and books',
        'Counselling support',
        'Transportation'
      ]
    },
    {
      id: 'year',
      title: 'Year Sponsorship',
      amount: '$250',
      description: 'Sponsor a girl for an entire academic year.',
      features: [
        'Full year school fees',
        'Complete school supplies',
        'Regular counselling',
        'Transportation support',
        'Skills development'
      ]
    },
    {
      id: 'complete',
      title: 'Complete Education',
      amount: '$500',
      description: 'Support a girl through her entire secondary education journey.',
      features: [
        'All school fees',
        'All learning materials',
        'Full counselling support',
        'Skills training',
        'Mentorship program'
      ]
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
          <GraduationCap className="w-16 h-16 text-[#FFEB00] mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Sponsor a Girl. <span className="text-[#FFEB00]">Change Her World.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Your sponsorship provides a young mother with the opportunity to return to school, 
            rebuild her confidence, and create a brighter future.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* What Sponsorship Covers */}
      <section className="py-12 bg-white border-b border-[#E0E2E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
            What Your Sponsorship <span className="text-[#003A99]">Covers</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <BookOpen className="w-8 h-8 text-[#003A99] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Education</h3>
              <p className="text-sm text-[#4A4F59]">School fees, uniforms, books, and learning materials</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <Heart className="w-8 h-8 text-[#1A7F00] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Support Services</h3>
              <p className="text-sm text-[#4A4F59]">Counselling, mentorship, and psychosocial support</p>
            </div>
            <div className="border border-[#E0E2E6] p-6 bg-[#F8F9FA] text-center">
              <User className="w-8 h-8 text-[#003A99] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A1A1A]">Essential Needs</h3>
              <p className="text-sm text-[#4A4F59]">Transportation, housing, and basic necessities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] text-center mb-4">
            Choose Your <span className="text-[#003A99]">Sponsorship</span>
          </h2>
          <p className="text-[#4A4F59] text-center mb-12 max-w-2xl mx-auto">
            Select the option that works best for you. Every contribution makes a difference.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier) => (
              <div 
                key={tier.id}
                className="border border-[#E0E2E6] p-6 bg-white hover:border-[#003A99] transition-colors flex flex-col"
              >
                <h3 className="text-lg font-bold text-[#1A1A1A]">{tier.title}</h3>
                <div className="text-3xl font-bold text-[#003A99] my-3">{tier.amount}</div>
                <p className="text-sm text-[#4A4F59] mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#4A4F59]">
                      <CheckCircle className="w-4 h-4 text-[#1A7F00] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/support/donate"
                  className="block text-center bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors"
                >
                  Sponsor Now
                </Link>
              </div>
            ))}
          </div>
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
