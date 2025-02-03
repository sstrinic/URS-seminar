/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "random-d.uk",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
      }
    ],
  },
};
