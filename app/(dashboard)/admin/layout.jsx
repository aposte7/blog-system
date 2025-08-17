import BlogLayout from '@/src/blog_system/blog/BlogLayout'
import ProtectedRoute from '@/src/blog_system/ProtectedRoute'
import { Toaster } from 'sonner'

const Layout = ({ children }) => {
	return (
		<ProtectedRoute>
			<BlogLayout>{children}</BlogLayout>
			<Toaster position="top-right" richColors />
		</ProtectedRoute>
	)
}

export default Layout
