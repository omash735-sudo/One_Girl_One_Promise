import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'One Goal One Promise - Empowering Teen Mothers in Malawi',
    template: '%s | One Goal One Promise'
  },
  description: 'OGOP empowers teen mothers through education, counselling, and skills development. Join us to restore hope and transform lives in Malawi.',
  keywords: ['teen mothers', 'Malawi', 'education', 'empowerment', 'OGOP', 'One Goal One Promise', 'girls education', 'community development'],
  authors: [{ name: 'One Goal One Promise' }],
  creator: 'One Goal One Promise',
  publisher: 'One Goal One Promise',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ogop.org',
    title: 'One Goal One Promise - Empowering Teen Mothers in Malawi',
    description: 'Restoring hope and opportunity to teen mothers in rural Malawi through education, counselling, and skills development.',
    siteName: 'One Goal One Promise',
    images: [
      {
        url: 'https://res.cloudinary.com/dfsvnaslv/image/upload/v1786219258/file_0000000034e48246addcab843282da68_260808214416_l1r4bm.png',
        width: 1200,
        height: 630,
        alt: 'One Goal One Promise Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Goal One Promise - Empowering Teen Mothers in Malawi',
    description: 'Restoring hope and opportunity to teen mothers in rural Malawi through education, counselling, and skills development.',
    images: ['https://res.cloudinary.com/dfsvnaslv/image/upload/v1786219258/file_0000000034e48246addcab843282da68_260808214416_l1r4bm.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#003A99',
  colorScheme: 'light',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ogop.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.className} ${poppins.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
