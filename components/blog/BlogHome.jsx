'use client'
import { Calendar, Clock, Star, TrendingUp } from 'lucide-react'
import BlogFeaturedList from './BlogFeaturedList'
import BlogHeader from './BlogHeader'
import BlogPostList from './BlogPostList'
import { useRecentPosts } from './useRecentPosts'
import { Loading } from '../Loading'

const BlogHome = () => {
	return (
		<>
			<BlogHeader />

			<main className="bg-muted/20">
				<div className="grid grid-cols-1 gap-5 space-y-8 px-4 py-24 lg:grid-cols-[1fr_minmax(17rem,20rem)] xl:gap-12 xl:px-10">
					<section className="featured-blogs order-2 space-y-8 lg:order-none">
						<div className="featured-text-wrapper">
							<h2 className="flex items-center justify-center gap-4 text-center text-3xl font-medium sm:text-4xl sm:font-semibold">
								<TrendingUp
									size={24}
									className="text-primary"
								/>
								<span className="text-foreground">
									Featured Articles
								</span>
							</h2>

							<p className="mt-3 text-center text-base text-muted-foreground md:text-lg">
								Discover our most popular and trending articles,
								carefully curated for our readers.
							</p>
						</div>

						<BlogFeaturedList />
					</section>

					<BlogSideBar>
						<BlogSubscribe />
						<BlogRecentPosts />
					</BlogSideBar>
				</div>

				<section className="latest-blogs space-y-12 px-4 py-24 lg:px-14">
					<div className="featured-text-wrapper">
						<h2 className="flex items-center justify-center gap-4 text-center text-3xl font-medium sm:text-4xl sm:font-semibold">
							Latest Articles
						</h2>

						<p className="mt-3 text-center text-base text-muted-foreground md:text-sm">
							Stay up-to-date with the latest insights, tutorials,
							and stories from our community of writers.
						</p>
					</div>

					<BlogPostList />
				</section>
			</main>
		</>
	)
}

const BlogSideBar = ({ children, className }) => {
	return (
		<aside
			className={`side-content order-1 flex h-fit min-w-[17rem] flex-col md:flex-row justify-between gap-5 lg:sticky lg:top-20 lg:order-none lg:flex-col ${className}`}
		>
			{children}
		</aside>
	)
}

const BlogSubscribe = () => {
	return (
		<div className="subscribe h-fit bg-card w-full rounded-lg border border-border px-6 py-8">
			<h3 className="inline-flex text-card-foreground items-center gap-3 text-lg font-medium md:text-xl">
				<Star size="1.1em" className="text-primary" /> Subscribe to
				Newsletter
			</h3>
			<p className="mt-2 py-px text-sm text-muted-foreground md:text-base">
				Get the latest articles delivered directly to your inbox.
			</p>
			<form action="" className="mt-6 flex flex-col gap-4">
				<input
					placeholder="Enter your email"
					className="rounded-md border border-slate-300 bg-purple-50 px-4 py-[7px] text-base focus:ring focus:ring-primary focus:ring-offset-2 focus:outline-none md:py-2 md:text-lg"
					type="text"
				/>
				<button className="rounded-md bg-primary px-4 py-[7px] text-center text-base font-medium text-white md:py-2 md:text-lg">
					Subscribe
				</button>
			</form>
		</div>
	)
}

const BlogRecentPosts = () => {
	const { posts, isLoading } = useRecentPosts()

	return (
		<div className="recent-blog bg-card w-full rounded-lg border border-border px-6 py-8">
			<h3 className="inline-flex text-foreground items-center gap-3 text-lg font-medium md:text-xl">
				<Clock size="1.1em" className="text-primary" /> Recent Posts
			</h3>

			<div className="recent-blog-wrapper divide-y divide-border">
				{isLoading ? (
					<Loading />
				) : posts.length === 0 ? (
					<p className="py-4 text-sm text-muted-foreground">
						No recent posts available.
					</p>
				) : (
					posts.map(({ id, title, published_at, read_time }) => (
						<div key={id} className="py-2">
							<h4 className="text-sm font-medium text-foreground">
								{title}
							</h4>
							<div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
								<p className="inline-flex flex-1 pr-4 items-center gap-1 border-r border-border">
									<Calendar
										className="text-inherit"
										size={10}
									/>
									{new Date(
										published_at
									).toLocaleDateString()}
								</p>
								<p className="inline-flex flex-1 pl-4 items-center gap-1">
									<Clock size={10} className="text-inherit" />
									{read_time || '—'} min read
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default BlogHome

export { BlogHeader, BlogRecentPosts, BlogSideBar, BlogSubscribe }
