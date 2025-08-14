'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'

function ProtectedRoute({ children }) {
	const { user, isLoading, isAuthenticated } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			router.push('/login')
		}
	}, [isLoading, isAuthenticated, router])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<span className="text-gray-600">Loading...</span>
			</div>
		)
	}

	if (!isAuthenticated) return null

	return children
}

export default ProtectedRoute
