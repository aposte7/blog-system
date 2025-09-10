import BlogLayout from '@/features/blog/BlogLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from 'sonner';

const Layout = ({ children }) => {
	return (
		<ProtectedRoute>
			<BlogLayout>{children}</BlogLayout>
			<Toaster position="top-right" richColors />
		</ProtectedRoute>
	);
};

export default Layout;
