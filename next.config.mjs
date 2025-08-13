/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'qgesgofxdyogpmcgiaiq.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/blog-images/**',
			},
		],
	},
}

export default nextConfig
