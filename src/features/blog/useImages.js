import { useQuery } from '@tanstack/react-query'
import { getImages } from '../services/postApi'

export function useImages() {
	const {
		isLoading,
		data: images,
		error,
	} = useQuery({
		queryKey: ['media'],
		queryFn: getImages,
	})

	return { isLoading, error, images }
}
