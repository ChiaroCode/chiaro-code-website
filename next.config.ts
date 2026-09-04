import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? '',
};

export default nextConfig;
