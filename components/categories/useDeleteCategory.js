import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteCategory as deleteCategoryApi } from '../services/categoriesApi'

function useDeleteCategory() {
	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isLoading: isDeleting } = useMutation({
		mutationFn: deleteCategoryApi,
		onSuccess: (data) => {
			toast.success('Category successfully Deleted')
			queryClient.invalidateQueries(['categories'])
		},
		onError: (err) => {
			const message =
				typeof err === 'string'
					? err
					: err?.message ||
					  'Something went wrong while deleting the category'
			toast.error(message)
			console.error(err)
		},
	})

	return { isDeleting, deleteCategory }
}

export default useDeleteCategory
