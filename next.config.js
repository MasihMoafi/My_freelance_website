/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' for Vercel deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'www.googleapis.com',
      },
    ],
  },
}

module.exports = nextConfig