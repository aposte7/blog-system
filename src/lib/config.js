const config = {
	env: {
		supabase: {
			urlEndpoint: process.env.NEXT_PUBLIC_SUPABASE_URL_ENDPOINT,
			anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		},
	},
};

export default config;
