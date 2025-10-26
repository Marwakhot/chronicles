/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Add Netlify-specific config
  trailingSlash: true,
  target: 'serverless'
}

module.exports = nextConfig
