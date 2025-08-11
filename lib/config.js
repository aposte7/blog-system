const config = {
	env: {
		supabase: {
			urlEndpoint: process.env.NEXT_PUBLIC_SUPABASE_URL_ENDPOINT,
			privateKey: process.env.SUPABASE_PRIVATE_KEY,
		},
	},
}

export default config
