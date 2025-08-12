import supabaseClient from './supabase'

export async function login({ email, password }) {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function getCurrentUser() {
	const { data: sessionData, error: sessionError } =
		await supabaseClient.auth.getSession()

	if (sessionError) {
		throw new Error(sessionError.message)
	}
	if (!sessionData.session) return null

	const { data: userData, error: userError } =
		await supabaseClient.auth.getUser()

	if (userError) {
		throw new Error(userError.message)
	}

	return userData?.user || null
}

export async function getCurrentUserProfile() {
	const user = await getCurrentUser()
	if (!user) return null

	const { data: profile, error: profileError } = await supabaseClient
		.from('profiles')
		.select('*')
		.eq('id', user.id) // id matches auth.users.id
		.single()

	if (profileError) return null
	return profile
}
