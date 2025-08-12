import supabaseClient, { supabaseUrl } from './supabase'
import { getCurrentUser, getCurrentUserProfile } from './authApi'

export async function getPosts() {
	const { data, error } = await supabaseClient
		.from('posts')
		.select(
			`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      status,
      views,
      published_at,
      updated_at,
      author:profiles(id, name, email, company_role),
      category:categories(id, name, slug),
      post_tags(tag:tags(id, name, slug))
    `
		)
		.order('created_at', { ascending: false })

	if (error) throw error
	console.log(data)
	return data
}

export async function getPostById(id) {
	const { data, error } = await supabaseClient
		.from('posts')
		.select(
			`
      id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      status,
      views,
      published_at,
      created_at,
      updated_at,
      author:profiles(id, name, email, company_role, avatar),
      category:categories(id, name, slug),
      post_tags(tag:tags(id, name, slug)),
      comments(id, content, author_name, author_email, parent_id, status)
    `
		)
		.eq('id', id)
		.single()

	if (error) throw error
	return data
}

export async function updatePost(postId, updates) {
	const { data, error } = await supabaseClient
		.from('posts')
		.update(updates)
		.eq('id', postId)
		.select()
		.single()

	if (error) throw error
	return data
}

export async function deletePost(postId) {
	const { data, error } = await supabaseClient
		.from('posts')
		.delete()
		.eq('id', postId)
		.select()
		.single()

	if (error) throw error
	return data
}

export async function createPost({
	title,
	slug,
	content,
	excerpt,
	featuredImage,
	status,
	category,
	publishDate,
	media = [],
	tags = [],
}) {
	const profile = await getCurrentUserProfile()
	if (!profile) throw new Error('User not authenticated')

	const { data: postData, error: postError } = await supabaseClient
		.from('posts')
		.insert([
			{
				title,
				slug,
				content,
				excerpt,
				featured_image: featuredImage,
				status: status.toLowerCase(),
				author_id: profile.id,
				category_id: category,
				views: 0,
				published_at: publishDate,
			},
		])
		.select()
		.single()

	if (postError) throw postError
	const postId = postData.id

	if (tags.length > 0) {
		const tagRows = tags.map((tagId) => ({
			post_id: postId,
			tag_id: tagId,
		}))
		const { error: tagsError } = await supabaseClient
			.from('post_tags')
			.insert(tagRows)

		if (tagsError) throw tagsError
	}

	// Insert media if any
	if (media.length > 0) {
		const mediaRows = media.map((md) => ({
			post_id: postId,
			media_id: md.id,
		}))
		const { error: mediaError } = await supabaseClient
			.from('post_media')
			.insert(mediaRows)

		if (mediaError) throw mediaError
	}

	return postData
}

export async function uploadImage(imageFile) {
	const imageName = `${Date.now()}-${imageFile.name}`.replaceAll('/', '')
	const image_url = `${supabaseUrl}/storage/v1/object/public/blog-images/${imageName}`

	const user = await getCurrentUser()
	if (!user) throw new Error('User not authenticated')

	const { error: uploadError } = await supabaseClient.storage
		.from('blog-images')
		.upload(imageName, imageFile, {
			cacheControl: '3600',
			upsert: false,
		})

	if (uploadError) throw uploadError

	const { data, error: dbError } = await supabaseClient
		.from('media')
		.insert([
			{
				image_url,
				alt_text: `${imageFile.name} blog image`,
				uploaded_by: user.id,
			},
		])
		.select()
		.single()

	if (dbError) throw dbError

	return data
}

export async function getImages() {
	const { data, error } = await supabaseClient
		.from('media')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) throw error
	return data
}
