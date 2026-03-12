import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/seopung-web" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/seopung-web/" : "",
};

export default nextConfig;
