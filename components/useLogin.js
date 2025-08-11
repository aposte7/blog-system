import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from './services/authApi'
import { useRouter } from 'next/navigation'

export function useLogin() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: loginApi, isLoading } = useMutation({
		mutationFn: (data) => login(data),
		onSuccess: (user) => {
			queryClient.setQueriesData(['user'], user)
			router.push('/admin')
		},
		onError: (err) => {
			console.log(err.message)
		},
	})

	return { loginApi, isLoading }
}
