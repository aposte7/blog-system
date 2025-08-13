import { useQuery } from '@tanstack/react-query'
import { use } from 'react'
import { getPostById } from '../services/postApi'

export function usePost(params) {
	const { blogId } = use(params)

	const {
		isLoading,
		data: post,
		error,
	} = useQuery({
		queryKey: ['post', blogId],
		queryFn: () => getPostById(blogId),
		enabled: Boolean(blogId),
	})

	return { isLoading, error, post }
}
