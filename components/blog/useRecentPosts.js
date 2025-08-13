import { useQuery } from '@tanstack/react-query'
import { getRecentPosts } from '../services/postApi'

export function useRecentPosts() {
	const {
		isLoading,
		error,
		data: posts,
	} = useQuery({
		queryKey: ['recent-posts'],
		queryFn: getRecentPosts,
		staleTime: 60 * 1000,
	})

	return { isLoading, posts, error }
}
