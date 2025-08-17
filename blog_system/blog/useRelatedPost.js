import { useQuery } from '@tanstack/react-query'
import { getRelatedPosts } from '../services/postApi'

export function useRelatedPosts({ categoryId, currentPostId }) {
	const { isLoading, data: relatedPosts } = useQuery({
		queryKey: ['relatedPosts', categoryId],
		queryFn: () => getRelatedPosts(categoryId, currentPostId), // return the promise
		enabled: Boolean(categoryId),
		initialData: [], // optional: avoids undefined on first render
	})

	return { isLoading, relatedPosts }
}
