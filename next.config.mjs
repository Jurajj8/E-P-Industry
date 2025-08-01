/** @type {import('next').NextConfig} */

// Názov vášho GitHub repozitára
const repoName = "ep-industry-website"

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ""
let basePath = ""

if (isGithubActions) {
  // Nastavenie pre GitHub Pages
  assetPrefix = `/${repoName}/`
  basePath = `/${repoName}`
}

const nextConfig = {
  output: "export", // Povolí statický export
  assetPrefix: assetPrefix,
  basePath: basePath,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Vypne optimalizáciu obrázkov pre statický hosting
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimalizácie pre produkciu
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Kompresia
  compress: true,
  // Optimalizácia bundlov
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  // Headers pre bezpečnosť a performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
