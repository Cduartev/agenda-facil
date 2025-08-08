/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Para produção com Docker
  // OR para desenvolvimento:
  // assetPrefix: '/_next/static',
  async rewrites() {
    return [
      {
        source: '/_next/static/:path*',
        destination: '/_next/static/:path*',
      },
    ]
  }
}

module.exports = nextConfig