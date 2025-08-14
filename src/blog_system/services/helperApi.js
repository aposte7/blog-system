import supabaseClient from './supabase'

// Total posts
export async function getTotalPosts() {
	const { count, error } = await supabaseClient
		.from('posts')
		.select('id', { count: 'exact', head: true })

	if (error) throw error
	return count
}

// Total comments
export async function getTotalComments() {
	const { count, error } = await supabaseClient
		.from('comments')
		.select('id', { count: 'exact', head: true })

	if (error) throw error
	return count
}

// Total views (sum of all post views)
export async function getTotalViews() {
	const { data, error } = await supabaseClient.from('posts').select('views') // assuming 'views' column exists

	if (error) throw error

	const totalViews = data.reduce((sum, post) => sum + (post.views || 0), 0)
	return totalViews
}
