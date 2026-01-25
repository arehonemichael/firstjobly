/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Local development
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        // Production (no www)
        protocol: "https",
        hostname: "firstjobly.co.za",
        pathname: "/uploads/**",
      },
      {
        // Production (with www)
        protocol: "https",
        hostname: "www.firstjobly.co.za",
        pathname: "/uploads/**",
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
