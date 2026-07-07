import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1mb, which real-world photos from a phone camera exceed
      // (that's what caused the "server-side exception" on service image
      // upload). Vercel's own serverless function payload ceiling is ~4.5mb,
      // so this stays just under that.
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rykfkrpqrtsxrmvuxpyt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
