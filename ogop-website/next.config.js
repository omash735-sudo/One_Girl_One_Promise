/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com'
    ],
  },
  experimental: {
    serverActions: true,
  },
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig
