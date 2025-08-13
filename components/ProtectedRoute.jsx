'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'
import { Loading } from './Loading'

function ProtectedRoute({ children }) {
	const { user, isLoading, isAuthenticated } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			router.push('/login')
		}
	}, [isLoading, isAuthenticated, router])

	if (isLoading) {
		return <Loading />
	}

	if (!isAuthenticated) return null

	return children
}

export default ProtectedRoute
