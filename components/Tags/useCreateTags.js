import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategories as CreateCategoriesApi } from '../services/categoriesApi'
import { createTags as createTagsApi } from '../services/tagApi'
import { toast } from 'sonner'

export function useCreateTags() {
	const queryClient = useQueryClient()

	const { mutate: createTags, isLoading: isCreating } = useMutation({
		mutationFn: (newTag) => createTagsApi(newTag),
		onSuccess: () => {
			toast.success('New Tag successfully created')
			queryClient.invalidateQueries(['categories'])
		},
		onError: (err) => toast.error(err.message),
	})

	return { isCreating, createTags }
}
