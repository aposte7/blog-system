import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../services/postApi'

export function useCreatePost() {
	const queryClient = useQueryClient()

	const { mutate: createPostApi, isLading: isCreating } = useMutation({
		mutationFn: (newPost) => createPost(newPost),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts'])
		},
	})

	return { isCreating, createPostApi }
}
