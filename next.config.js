/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' for Vercel deployment
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig