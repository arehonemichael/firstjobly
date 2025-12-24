/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    runtime: 'nodejs', // Force Node.js runtime (fixes Firebase + Edge issues)
  },

  images: {
    domains: ['firebasestorage.googleapis.com'], // allow Firebase URLs
  },

  // Optional: better for production & deployments (Vercel/Docker)
  output: 'standalone',
};

module.exports = nextConfig;
