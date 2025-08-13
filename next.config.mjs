/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'your host name eg.(ddffrhykkmdmiokfi.supabase.co)',
				port: '',
				pathname: '/storage/v1/object/public/(BUCKET NAME)/**',
			},
		],
	},
}

export default nextConfig
