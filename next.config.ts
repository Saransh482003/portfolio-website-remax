import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/learn", destination: "/projects", permanent: true },
      { source: "/contact", destination: "/consulting", permanent: true },
    ];
  },
};

export default nextConfig;
