import BlogLayout from '@/components/blog/BlogLayout'
import ProtectedRoute from '@/components/ProtectedRoute'

const Layout = ({ children }) => {
	return (
		<ProtectedRoute>
			<BlogLayout>{children}</BlogLayout>
		</ProtectedRoute>
	)
}

export default Layout
