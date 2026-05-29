/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let webpack bundle the Prisma client, the Neon serverless driver, or
  // `ws`. Bundling `ws` breaks its optional `bufferutil` native helper, which
  // throws "bufferUtil.mask is not a function". Loading them as runtime Node
  // modules (externals) avoids that.
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@prisma/adapter-neon',
      '@neondatabase/serverless',
      'ws',
    ],
  },
};

export default nextConfig;
