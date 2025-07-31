/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: '/E-P-Industry',
  assetPrefix: '/E-P-Industry/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig