import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*'],
    },
  },
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  proxy: true,
};

export default nextConfig;
