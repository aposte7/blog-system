import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost as createPostApi } from '../services/postApi'
import { toast } from 'sonner'

export function useCreatePost() {
	const queryClient = useQueryClient()

	const { mutate: createPost, isLading: isCreating } = useMutation({
		mutationFn: ({ newPost, id }) => createPostApi(newPost, id),
		onSuccess: (data, variables) => {
			if (variables?.id) {
				queryClient.invalidateQueries(['post', variables.id])
				toast.success('Post successfully updated!')
			} else {
				toast.success('New post successfully created!')
			}

			queryClient.invalidateQueries(['posts'])
			queryClient.invalidateQueries(['recent-posts'])
		},
		onError: (err) => {
			const message =
				typeof err === 'string'
					? err
					: err?.message ||
					  'Something went wrong while saving the tag'
			toast.error(message)
			console.error(err)
		},
	})

	return { isCreating, createPost }
}
