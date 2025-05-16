import withPWA from 'next-pwa'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  output: 'standalone'
}

export default withPWA({
  dest: 'public',
  fallback: {
    document: '/_offline',
  },
  ...nextConfig
})