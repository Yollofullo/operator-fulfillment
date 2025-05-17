<<<<<<< HEAD
export default { reactStrictMode: true };
=======
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
>>>>>>> 5971a59ad466a9dd1814ff4f28ab772ce6c15400
