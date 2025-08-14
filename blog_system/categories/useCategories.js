import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/categoriesApi'

export function useCategories() {
	const {
		data: categories,
		isLoading,
		error: categoriesError,
	} = useQuery({
		queryFn: () => getCategories(),
		queryKey: ['categories'],
	})
	return { categories, isLoading, categoriesError }
}
