/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' est REQUIS pour le Dockerfile (génère server.js autonome)
  output: 'standalone',
  experimental: { serverComponentsExternalPackages: ['@babylonjs/core'] },
};
export default nextConfig;
