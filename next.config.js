/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      {
        // Firebase Storage
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        // WordPress images
        protocol: "https",
        hostname: "**.wordpress.com",
      },
    ],
  },

  // Compiler Options - Remove console.logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Use SWC for faster builds
  swcMinify: true,

  // Enable compression
  compress: true,

  // Webpack Configuration
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.optimization.minimizer =
        config.optimization.minimizer?.filter(
          (plugin) => plugin.constructor.name !== "TerserPlugin"
        );
    }

    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )?.[1];
            return `npm.${packageName?.replace('@', '')}`;
          },
        },
      },
    };

    return config;
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;