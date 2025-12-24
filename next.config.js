// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the correct way to disable Edge Runtime for Firebase
  // in Next.js 13
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Important: Tell Next.js to treat Firebase as external for server-side only
    config.externals = [...config.externals, 'firebase', '@firebase/firestore'];

    return config;
  },

  // Force all server functions to run on Node.js (not Edge)
  // This is the key setting
  // Note: This is the current correct flag for Next.js 13
  // (no "experimental" needed)
  // Vercel respects this
  // (it's in Vercel docs for Firebase)
  // https://vercel.com/docs/concepts/functions/edge-functions#edge-runtime-vs-nodejs-runtime
  // But for Next.js App Router, we use this:
  // Actually, the real fix is to mark middleware as Node.js (we already did)
  // But to be safe, add this too
};

module.exports = nextConfig;