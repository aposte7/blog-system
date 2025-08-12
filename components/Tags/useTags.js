import { useQuery } from '@tanstack/react-query'
import { getTags } from '../services/tagApi'

export function useTags() {
	const {
		data: tags,
		isLoading,
		error: categoriesError,
	} = useQuery({
		queryFn: () => getTags(),
		queryKey: ['tags'],
	})
	return { tags, isLoading, categoriesError }
}
