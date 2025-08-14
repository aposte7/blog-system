import './globals.css'
import QueryProvider from '@/src/blog_system/QueryProvider'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
