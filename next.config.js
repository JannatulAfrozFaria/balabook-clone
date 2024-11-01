/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Experimental - Ignore Next.js build errors
  experimental: {
    appDir: true, // If using the app directory
  },

  // Ignore React strict mode errors (optional)
  reactStrictMode: false,

  // Disable any additional warnings
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Skip static image optimization errors
  images: {
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
