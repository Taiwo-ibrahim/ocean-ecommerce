// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.clashstores.com",
        pathname: "/products/**", // Adjust the path to match your image URLs
      },
    ],
  },
}

export default nextConfig
