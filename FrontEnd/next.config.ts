// next.config.js or next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ✅ Add allowed external domain here
  },
};

export default nextConfig;
