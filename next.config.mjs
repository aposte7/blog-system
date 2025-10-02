/**
 * @type {import('next').NextConfig}
 */

// Parse the hostname from the full Supabase URL environment variable
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL_ENDPOINT
	? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL_ENDPOINT).hostname
	: '';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: supabaseHostname,
				pathname: '/storage/v1/object/public/blog-images/**',
			},
			{
				protocol: 'https',
				hostname: 'example.com',
			},
		],
	},
};

export default nextConfig;
