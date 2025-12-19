/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com'], // For Clerk user avatars
  },
  // Skip font optimization during build
  optimizeFonts: false,
}

module.exports = nextConfig

