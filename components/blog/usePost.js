import { useQuery } from '@tanstack/react-query'

export function usePost(id) {
	const {
		isLoading,
		data: post,
		error,
	} = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPostById(id),
		enabled: Boolean(id),
	})

	return { isLoading, error, post }
}
