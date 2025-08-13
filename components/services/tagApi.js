import supabaseClient from './supabase'

export async function getTags() {
	const { data, error } = await supabaseClient
		.from('tags')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) throw error
	return data
}

export async function getTagsWithPosts(id) {
	const { data, error } = await supabaseClient
		.from('tags')
		.select(
			`
      id,
      name,
      slug,
      description,
      created_at,
      posts (
        id,
        title,
        slug,
        excerpt,
        featured_image,
        status,
        published_at
      )
    `
		)
		.eq('id', id)
		.single()

	if (error) throw error
	return data
}

export async function createTags({ name, slug, description }, id) {
	if (id) {
		const { data, error } = await supabaseClient
			.from('tags')
			.update({ name, slug, description, color })
			.eq('id', id)
			.select()
			.single()

		if (error) throw error
		return data
	} else {
		const { data, error } = await supabaseClient
			.from('tags')
			.insert([{ name, slug, description, color }])
			.select()
			.single()
		if (error) throw error
		return data
	}
}

export async function deleteTag(tagId) {
	const { data, error } = await supabaseClient
		.from('tags')
		.delete()
		.eq('id', tagId)
		.select()
		.single()

	if (error) throw error
	return data
}
