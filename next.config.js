/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig