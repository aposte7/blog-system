import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../services/postApi'

export function usePosts() {
	const {
		isLoading,
		error,
		data: posts,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		staleTime: 60 * 1000,
	})

	return { isLoading, posts, error }
}
