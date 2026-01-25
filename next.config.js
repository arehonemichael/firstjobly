/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Add this to disable image optimization globally
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "firstjobly.co.za",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.firstjobly.co.za",
        pathname: "/uploads/**",
      },
      {
        // Firebase Storage
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
      },
    ],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.optimization.minimizer =
        config.optimization.minimizer?.filter(
          (plugin) => plugin.constructor.name !== "TerserPlugin"
        );
    }
    return config;
  },
};

module.exports = nextConfig;