import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategories as CreateCategoriesApi } from '../services/categoriesApi'
import { createTags as createTagsApi } from '../services/tagApi'

export function useCreateTags() {
	const queryClient = useQueryClient()

	const { mutate: createTags, isLoading: isCreating } = useMutation({
		mutationFn: (newTag) => createTagsApi(newTag),
		onSuccess: () => {
			queryClient.invalidateQueries(['categories'])
		},
	})

	return { isCreating, createTags }
}
