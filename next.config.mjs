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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Vypne optimalizáciu obrázkov, ktorá na statickom hostingu nefunguje
  },
}

export default nextConfig
