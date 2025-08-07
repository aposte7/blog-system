import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, Eye, Star, TrendingUp } from 'lucide-react'
import BlogHeader from '@/components/blog/BlogHeader'
import { blogPosts, getFeaturedPosts } from '@/data'
import Link from 'next/link'

const BlogHome = () => {
	const recentPosts = [
		{
			id: 1,
			title: 'Building Modern Web Applications with React 18',
			date: '1 week ago',
			readTime: '7 min read',
		},
		{
			id: 2,
			title: 'Building Modern Web Applications with React 18',
			date: '1 week ago',
			readTime: '7 min read',
		},
		{
			id: 3,
			title: 'Building Modern Web Applications with React 18',
			date: '1 week ago',
			readTime: '7 min read',
		},
	]

	return (
		<>
			<BlogHeader />

			<main className="bg-muted/20">
				<div className="grid grid-cols-1 gap-5 space-y-8  px-4 py-24 lg:grid-cols-[1fr_minmax(17rem,20rem)] xl:gap-12 xl:px-10">
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

						<div className="card-container flex flex-col justify-evenly gap-8 pt-8 min-[50rem]:flex-row lg:gap-12">
							{getFeaturedPosts().map((article, i) => (
								<BlogCard key={i} {...article} />
							))}
						</div>
					</section>

					<BlogSideBar>
						<BlogSubscribe />
						<BlogRecentPosts posts={recentPosts} />
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

					<div className="card-container grid grid-cols-[minmax(22rem,30rem)] justify-evenly gap-8 min-[50rem]:grid-cols-[minmax(22rem,30rem)_minmax(22rem,30rem)] xl:grid-cols-3">
						{blogPosts.map((article, i) => (
							<BlogCard key={i} {...article} />
						))}
					</div>
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
const BlogCard = ({
	category,
	title,
	excerpt,
	tags = [],
	author = {},
	publishedAt,
	readTime,
	views,
	image,
	id,
}) => {
	return (
		<Link href={`/blog/${id}`}>
			<div className="card  group cursor-pointer transition-all duration-300 hover:shadow-blog-hover shadow-blog hover:-translate-y-1 h-fit bg-card min-w-[23rem] overflow-hidden rounded-xl border border-border">
				<div className="card-image-wrapper mb-5 h-[14rem] w-full">
					<Image
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						width={400}
						height={400}
						src={image}
						alt={title}
					/>
				</div>

				<div className="card-text divide-y divide-border px-6 pb-7 sm:px-8">
					<div className="space-y-3 py-4">
						<p className="inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground">
							{category}
						</p>

						<h2 className="text-lg transition-colors duration-300 group-hover:text-primary text-card-foreground font-semibold md:text-xl">
							{title}
						</h2>

						<p className="line-clamp-3 text-sm text-muted-foreground md:text-[15px]">
							{excerpt}
						</p>

						<div className="blog-tags flex flex-wrap gap-2">
							{tags.map((tag) => (
								<p
									key={tag}
									className="rounded-full border border-border text-foreground px-2 text-sm"
								>
									# {tag}
								</p>
							))}
						</div>
					</div>

					{/* Author Info */}
					<div className="blog-info">
						<div className="blog-author flex items-center gap-3 py-3">
							<Image
								src={author.avatar}
								alt={author.name}
								width={40}
								height={40}
								className="rounded-full h-10 w-10 object-top object-cover"
							/>
							<div>
								<p className="font-medium text-card-foreground">
									{author.name}
								</p>
								<p className="text-sm text-muted-foreground">
									{author.role}
								</p>
							</div>
						</div>

						{/* Blog Meta */}
						<div className="grid grid-cols-[5rem_5rem_1fr_5rem] justify-end gap-3 text-xs text-muted-foreground">
							<p className="inline-flex items-center gap-1">
								<Calendar size={10} /> {publishedAt}
							</p>
							<p className="inline-flex items-center gap-1">
								<Clock size={10} /> {readTime}
							</p>
							<p className="col-start-4 inline-flex items-center justify-end gap-1">
								<Eye size={12} /> {views}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
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

const BlogRecentPosts = ({ posts = [] }) => {
	return (
		<div className="recent-blog bg-card w-full rounded-lg border border-border px-6 py-8">
			<h3 className="inline-flex text-foreground items-center gap-3 text-lg font-medium md:text-xl">
				<Clock size="1.1em" className="text-primary" /> Recent Posts
			</h3>

			<div className="recent-blog-wrapper divide-y divide-border">
				{posts.map(({ id, title, date, readTime }) => (
					<div key={id} className="py-2">
						<h4 className="text-sm font-medium text-foreground">
							{title}
						</h4>
						<div className="mt-2 flex gap-3 text-xs text-muted-foreground">
							<p className="inline-flex items-center gap-1 border-r border-border">
								<Calendar className="text-inherit" size={10} />
								{date}
							</p>
							<p className="inline-flex items-center gap-1">
								<Clock size={10} className="text-inherit" />
								{readTime}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default BlogHome

export { BlogCard, BlogHeader, BlogRecentPosts, BlogSideBar, BlogSubscribe }
