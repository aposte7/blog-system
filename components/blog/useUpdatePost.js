import { useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../services/postApi'

export function useUpdatePost() {
	const queryClient = useQueryClient()

	const { mutate: updatePostApi, isLoading: isUpdating } = useMutation({
		mutationFn: ({ id, updates }) => updatePost(id, updates),
		onSuccess: (_, variables) => {
			// Invalidate both the posts list and the single updated post cache
			queryClient.invalidateQueries(['posts'])
			queryClient.invalidateQueries(['post', variables.id])
		},
	})

	return { updatePostApi, isUpdating }
}
