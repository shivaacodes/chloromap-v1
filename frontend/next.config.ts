import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Allows localhost images
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Specific to your Flask backend
        pathname: "/api/processed/**", // Matches your processed image URLs
      },
    ],
  },
};

export default nextConfig;
