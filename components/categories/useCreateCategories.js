import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategories as CreateCategoriesApi } from '../services/categoriesApi'

export function useCreateCategories() {
	const queryClient = useQueryClient()

	const { mutate: createCategories, isLoading: isCreating } = useMutation({
		mutationFn: (newCategory) => CreateCategoriesApi(newCategory),
		onSuccess: () => {
			queryClient.invalidateQueries(['categories'])
		},
	})

	return { isCreating, createCategories }
}
