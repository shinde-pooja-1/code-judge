// next.config.mjs
import withBundleAnalyzer from "@next/bundle-analyzer";
/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  compress: true,
  reactCompiler: true,
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
