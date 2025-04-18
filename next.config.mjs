import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Reduce the bundle size by enabling compression
  compress: true,

  // Optimize images
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enable webpack optimization
  webpack: (config, { dev }) => {
    // Only run in production build
    if (!dev) {
      // Split chunks more aggressively for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for third-party libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
          // Common chunk for code shared between pages
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };

      // Minimize JS in production
      config.optimization.minimize = true;
    }

    return config;
  },

  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,

  // Disable powered by header
  poweredByHeader: false,

  // Enable strict mode for better error catching
  reactStrictMode: true,

  // Reduce the size of the Next.js runtime
  experimental: {
    optimizeCss: true,
  },
};

export default withBundleAnalyzer(nextConfig);
