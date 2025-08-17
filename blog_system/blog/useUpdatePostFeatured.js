import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updatePostFeatured } from '../services/postApi'

export function useUpdatePostFeatured() {
	const queryClient = useQueryClient()

	const { mutate: updatePostFeaturedStatus, isLading: isUpdating } =
		useMutation({
			mutationFn: ({ postId, featured }) =>
				updatePostFeatured(postId, featured),
			onSuccess: () => {
				queryClient.invalidateQueries(['post'])
				toast.success('Post featured status successfully updated!')
			},
			onError: (err) => {
				const message =
					typeof err === 'string'
						? err
						: err?.message ||
						  'Something went wrong while updating the featured status for post'
				toast.error(message)
				console.error(err)
			},
		})

	return { isUpdating, updatePostFeaturedStatus }
}
