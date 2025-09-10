import NavBar from '@/components/NavBar';
import { Toaster } from 'sonner';

const Layout = ({ children }) => {
	return (
		<>
			<NavBar />
			{children}
			<Toaster position="top-right" richColors />
		</>
	);
};

export default Layout;
