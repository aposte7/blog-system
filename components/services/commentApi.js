import supabaseClient from './supabase'

export async function getComments(postId) {
	let query = supabaseClient.from('comments').select('*')

	if (postId) {
		query = query.eq('post_id', postId)
	}

	const { data, error } = await query

	console.log('comments -------', data)
	if (error) throw error

	return data
}

export async function createComment({
	content,
	name,
	email,
	post_id,
	parentId = null,
}) {
	const { data, error } = await supabaseClient
		.from('comments')
		.insert([
			{
				content,
				author_name: name,
				author_email: email,
				post_id,
				parent_id: parentId,
				status: 'approved',
			},
		])
		.select()
		.single()

	if (error) throw error
	return data
}

export async function deleteComment(commentId) {
	const { data, error } = await supabaseClient
		.from('comments')
		.delete()
		.eq('id', commentId)
		.select()
		.single()

	if (error) throw error
	return data
}

export async function updateCommentStatus(commentId, newStatus) {
	const { data, error } = await supabaseClient
		.from('comments')
		.update({ status: newStatus })
		.eq('id', commentId)
		.select()
		.single()

	if (error) throw error
	return data
}
