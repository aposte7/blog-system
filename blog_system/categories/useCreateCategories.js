import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategories as CreateCategoriesApi } from '../services/categoriesApi'
import { toast } from 'sonner'

export function useCreateCategories() {
	const queryClient = useQueryClient()

	const { mutate: createCategories, isLoading: isCreating } = useMutation({
		mutationFn: ({ newCategory, id }) =>
			CreateCategoriesApi(newCategory, id),
		onSuccess: (data, variables) => {
			if (!variables?.id) {
				toast.success('New Category successfully created!')
			} else {
				toast.success(' Category successfully Updated!')
			}

			queryClient.invalidateQueries(['categories'])
		},

		onError: (err) => {
			const message =
				typeof err === 'string'
					? err
					: err?.message ||
					  'Something went wrong while saving the category'
			toast.error(message)
			console.error(err)
		},
	})

	return { isCreating, createCategories }
}
