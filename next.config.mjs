/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   unoptimized: true,
  // },
  basePath: '/E-P-Industry',
  assetPrefix: '/E-P-Industry/',
}

export default nextConfig