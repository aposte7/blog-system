import supabaseClient from './supabase'

export async function getCategories() {
	const { data, error } = await supabaseClient
		.from('categories')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) throw error
	return data
}

export async function getCategoryWithPosts(id) {
	const { data, error } = await supabaseClient
		.from('categories')
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

export async function createCategories({ name, slug, description, color }, id) {
	if (id) {
		const { data, error } = await supabaseClient
			.from('categories')
			.update({ name, slug, description, color })
			.eq('id', id)
			.select()
			.single()

		if (error) throw error
		return data
	} else {
		const { data, error } = await supabaseClient
			.from('categories')
			.insert([{ name, slug, description, color }])
			.select()
			.single()

		if (error) throw error
		return data
	}
}

export async function updateCategory(categoryId, updates) {
	const { data, error } = await supabaseClient
		.from('categories')
		.update(updates)
		.eq('id', categoryId)
		.select()
		.single()

	if (error) throw error
	return data
}

export async function deleteCategory(categoryId) {
	const { data, error } = await supabaseClient
		.from('categories')
		.delete()
		.eq('id', categoryId)
		.select()
		.single()

	if (error) throw error
	return data
}
