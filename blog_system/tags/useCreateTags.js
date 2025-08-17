import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTags as createTagsApi } from '../services/tagApi'
import { toast } from 'sonner'

export function useCreateTags() {
	const queryClient = useQueryClient()

	const { mutate: createTags, isLoading: isCreating } = useMutation({
		mutationFn: ({ newTag, id }) => createTagsApi(newTag, id),
		onSuccess: (data, variables) => {
			if (variables?.id) {
				toast.success('Tag successfully updated')
			} else toast.success('New Tag successfully created')
			queryClient.invalidateQueries(['tags'])
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

	return { isCreating, createTags }
}
