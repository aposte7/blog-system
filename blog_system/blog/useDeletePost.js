import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost as deletePostApi } from '../services/postApi'
import { toast } from 'sonner'

export function useDeletePost() {
	const queryClient = useQueryClient()

	const { mutate: deletePost, isLoading: isDeleting } = useMutation({
		mutationFn: (id) => deletePostApi(id),
		onSuccess: (data) => {
			toast.success('Post successfully Deleted')
			queryClient.invalidateQueries(['posts'])
			queryClient.invalidateQueries(['recent-posts'])
		},
		onError: (err) => {
			const message =
				typeof err === 'string'
					? err
					: err?.message ||
					  'Something went wrong while deleting the pot'
			toast.error(message)
			console.error(err)
		},
	})

	return { isDeleting, deletePost }
}
