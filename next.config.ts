import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/Seopung" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Seopung/" : "",
};

export default nextConfig;
