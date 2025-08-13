import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTag as deleteTagApi } from '../services/tagApi'
import { toast } from 'sonner'

function useDeleteTags() {
	const queryClient = useQueryClient()

	const { mutate: deleteTag, isLoading: isDeleting } = useMutation({
		mutationFn: deleteTagApi,
		onSuccess: (data) => {
			toast.success('Tag successfully Deleted')
			queryClient.invalidateQueries(['tags'])
		},
		onError: (err) => {
			const message =
				typeof err === 'string'
					? err
					: err?.message ||
					  'Something went wrong while deleting the tag'
			toast.error(message)
			console.error(err)
		},
	})

	return { isDeleting, deleteTag }
}

export default useDeleteTags
