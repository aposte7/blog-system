import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from './services/authApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useLogin() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: loginApi, isLoading } = useMutation({
		mutationFn: (data) => login(data),
		onSuccess: (data) => {
			queryClient.setQueriesData(['user'], data.user)
			router.push('/admin')
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return { loginApi, isLoading }
}
