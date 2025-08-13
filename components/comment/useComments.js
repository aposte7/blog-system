import { useQuery } from '@tanstack/react-query'
import { getComments } from '../services/commentApi'
import { use } from 'react'

export function useComments(params) {
	const { blogId } = use(params)

	const {
		isLoading,
		error,
		data: comments,
	} = useQuery({
		queryKey: ['comments', blogId],
		queryFn: () => getComments(blogId),
		staleTime: 60 * 1000,
	})

	return { isLoading, comments, error }
}
