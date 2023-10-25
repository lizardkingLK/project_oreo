/** @type {import('next').NextConfig} */

const supabaseImageHostName = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['avatars.githubusercontent.com', 'img.clerk.com', supabaseImageHostName],
  },
  output: 'standalone',
}

module.exports = nextConfig
