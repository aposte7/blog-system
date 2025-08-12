import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../services/postApi'

export function useDeletePost() {
	const queryClient = useQueryClient()

	const { mutate: deletePostApi, isLoading: isDeleting } = useMutation({
		mutationFn: (id) => deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts'])
		},
	})

	return { isDeleting, deletePostApi }
}
