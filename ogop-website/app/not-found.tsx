import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-[#003A99] tracking-tight">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-6 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-[#4A4F59] mb-4 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="bg-[#003A99] text-white p-4 mb-8">
          <span className="text-sm font-medium">
            Our team is working on it. Please wait patiently while we get everything in order.
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-[#003A99] text-white px-6 py-3 font-semibold hover:bg-[#002A70] transition-colors"
          >
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-block border-2 border-[#003A99] text-[#003A99] px-6 py-3 font-semibold hover:bg-[#003A99] hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#E0E2E6]">
          <p className="text-sm text-[#6C727D]">
            Looking for something specific?{' '}
            <Link href="/" className="text-[#003A99] font-semibold hover:underline">
              Visit our homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
