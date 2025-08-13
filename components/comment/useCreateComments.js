import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createComment as createCommentApi } from '../services/commentApi'
import { use } from 'react'

export function useCreateComments(params) {
	const { blogId } = use(params)
	const queryClient = useQueryClient()

	const { mutate: createComment, isLading: isCreating } = useMutation({
		mutationFn: createCommentApi,
		onSuccess: () => {
			toast.success('successfully commented!')
			queryClient.invalidateQueries(['comments', blogId])
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

	return { isCreating, createComment }
}
