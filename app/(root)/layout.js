import BlogHeader from '@/components/blog/BlogHeader'

const Layout = ({ children }) => {
	return (
		<>
			<BlogHeader />
			{<main className="">{children}</main>}
		</>
	)
}

export default Layout
