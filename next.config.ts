import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/custom-route',
        destination: '/another-route',
      },
    ];
  },
  images: {
    domains: ['i.pinimg.com'],
  },
};

export default nextConfig;
