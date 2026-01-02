import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable image optimization for SVGs (they're already optimized)
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    // Add your domain if you're loading images from external sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.amiyoo.com",
      },
    ],
  },
};

export default nextConfig;
