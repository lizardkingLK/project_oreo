/** @type {import('next').NextConfig} */

const supabaseImageHostName = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'img.clerk.com', supabaseImageHostName],
  },
}

module.exports = nextConfig
