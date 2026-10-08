import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensures that dynamic data files are included in the Vercel/production serverless function build
  outputFileTracingIncludes: {
    '/api/repositories/*': ['./src/data/repositories/**/*'],
    '/api/execute': ['./src/data/repositories/**/*'],
    '/practice/repository/*': ['./src/data/repositories/**/*'],
  },
};

export default nextConfig;
