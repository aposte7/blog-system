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
	  featured,
      author:profiles(id, name, email, company_role),
      category:categories(id, name, slug,color),
      post_tags(tag:tags(id, name, slug,color)),
	  read_time
    `
		)
		.order('created_at', { ascending: false })

	if (error) throw error
	return data
}
export async function getRecentPosts() {
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
	  featured,
      author:profiles(id, name, email, company_role),
      category:categories(id, name, slug,color),
      post_tags(tag:tags(id, name, slug,color)),
	  read_time
    `
		)
		.order('created_at', { ascending: false })
		.limit(3)

	if (error) throw error
	return data || []
}

export async function getRelatedPosts(categoryId, currentPostId) {
	if (!categoryId || !currentPostId) {
		console.warn('Missing categoryId or currentPostId for getRelatedPosts')
		return []
	}

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
			featured,
			author:profiles(id, name, email, company_role, avatar),
			category:categories(id, name, slug, color),
			post_tags(tag:tags(id, name, slug, color)),
			read_time
		`
		)
		.eq('category_id', categoryId)
		.neq('id', currentPostId)
		.order('published_at', { ascending: false })

	if (error) {
		console.error('Error fetching related posts:', error.message)
		return []
	}

	return data || []
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
	  featured,
      status,
      views,
      published_at,
      created_at,
      updated_at,
      author:profiles(id, name, email, company_role, avatar),
      category:categories(id, name, slug,color),
      post_tags(tag:tags(id, name, slug,color)),
      comments(id, content, author_name, author_email, parent_id, status),
	  read_time
    `
		)
		.eq('id', id)
		.single()

	if (error) throw error
	return data
}

export async function updatePostFeatured(postId, featured) {
	if (!postId) throw new Error('Post ID is required')

	const { data, error } = await supabaseClient
		.from('posts')
		.update({
			featured,
			updated_at: new Date().toISOString(),
		})
		.eq('id', postId)
		.select('id, featured')
		.single()

	if (error) throw error
	return data
}

export async function deletePost(id) {
	if (!id) throw new Error('Post ID is required')

	const { data: existingPost, error: fetchError } = await supabaseClient
		.from('posts')
		.select('id')
		.eq('id', id)
		.single()

	if (fetchError) throw fetchError
	if (!existingPost) throw new Error('Post not found')

	const { error: tagsError } = await supabaseClient
		.from('post_tags')
		.delete()
		.eq('post_id', id)
	if (tagsError) throw tagsError

	const { error: mediaError } = await supabaseClient
		.from('post_media')
		.delete()
		.eq('post_id', id)
	if (mediaError) throw mediaError

	const { data, error: postError } = await supabaseClient
		.from('posts')
		.delete()
		.eq('id', id)
		.select()
		.single()

	if (postError) throw postError

	return data
}

export async function createPost(
	{
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
		read_time,
	},
	id // optional, if provided → update mode
) {
	const profile = await getCurrentUserProfile()
	if (!profile) throw new Error('User not authenticated')

	let postId

	if (id) {
		// ---------------- UPDATE POST ----------------
		const { data: updatedPost, error: updateError } = await supabaseClient
			.from('posts')
			.update({
				title,
				slug,
				content,
				excerpt,
				featured_image: featuredImage,
				status: status.toLowerCase(),
				category_id: category,
				published_at: publishDate,
				updated_at: new Date().toISOString(),
				read_time,
			})
			.eq('id', id)
			.select()
			.single()

		if (updateError) throw updateError
		postId = updatedPost.id

		// Remove old tags & re-insert
		await supabaseClient.from('post_tags').delete().eq('post_id', postId)
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

		// Remove old media & re-insert
		await supabaseClient.from('post_media').delete().eq('post_id', postId)
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

		return updatedPost
	} else {
		// ---------------- CREATE POST ----------------
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
		postId = postData.id

		// Insert tags
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

		// Insert media
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
