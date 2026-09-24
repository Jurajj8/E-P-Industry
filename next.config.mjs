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
  assetPrefix: assetPrefix,
  basePath: basePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Cloudinary robí zmenšovanie a formáty (WebP/AVIF) — funguje aj na statickom hostingu
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
}

export default nextConfig
