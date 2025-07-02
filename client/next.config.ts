import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://102.168.3.33',
    '192.168.199.119',
    'localhost',
    'local-origin.dev',
    '*.local-origin.dev',
    '192.168.3.33',
    '192.168.77.1'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.199.119'
      },
      {
        protocol: 'http',
        hostname: '192.168.3.33'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
{
protocol: 'https',
hostname: 'api.travelkhiva.uz'
},
      {
        protocol: 'http',
        hostname: 'travel-api.madrimov.uz'
      },
      {
        protocol: 'https',
        hostname: 'travel-api.madrimov.uz'
      }
    ]
  }
}

export default nextConfig
