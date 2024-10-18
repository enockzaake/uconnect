import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drascoedu.com",
      },
      {
        protocol: "https",
        hostname: "www.columbia.edu",
      },
      {
        protocol: "https",
        hostname: "www.bestchoiceschools.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
