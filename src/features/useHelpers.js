import { useQuery } from '@tanstack/react-query'
import {
	getTotalComments,
	getTotalPosts,
	getTotalViews,
} from './services/helperApi'

export function useTotalViews() {
	const {
		isLoading,
		data: totalViews,
		error,
	} = useQuery({
		queryKey: ['totalViews'],
		queryFn: getTotalViews,
		staleTime: 60000,
	})

	return { isLoading, totalViews, error }
}

export function useTotalComments() {
	const {
		isLoading,
		data: totalComments,
		error,
	} = useQuery({
		queryKey: ['totalComments'],
		queryFn: getTotalComments,
		staleTime: 60000,
	})

	return { isLoading, totalComments, error }
}

export function useTotalPosts() {
	const {
		isLoading,
		data: totalPosts,
		error,
	} = useQuery({
		queryKey: ['totalPosts'],
		queryFn: getTotalPosts,
		staleTime: 60000,
	})

	return { isLoading, totalPosts, error }
}
