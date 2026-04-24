/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the Mission Matrix PDF template ships with the serverless function
  // that fills it (Vercel doesn't bundle `public/` into API functions by default).
  outputFileTracingIncludes: {
    "/api/assessment/[id]/pdf": ["./public/downloads/map-the-meaning.pdf"],
  },
};

export default nextConfig;
