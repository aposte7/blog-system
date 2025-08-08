'use client'
import { blogPosts, getPostById } from '@/data'
import {
	ArrowLeft,
	Bookmark,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Clock,
	Eye,
	Heart,
	MessageCircle,
	Share2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogRecentPosts, BlogSideBar, BlogSubscribe } from '../page'
import React, { useState } from 'react'
import BlogCard, {
	BlogCardAuthor,
	BlogCardBody,
	BlogCardBodyWrapper,
	BlogCardExcerpt,
	BlogCardMeta,
	BlogCardTags,
	BlogCardTitle,
} from '@/components/blog/BlogCard'

function page({ params }) {
	const { blogId: id } = React.use(params)

	const post = getPostById(id || '')
	const [comments, setComments] = useState([])

	if (!post) {
		return (
			<div className="min-h-screen bg-blog-gradient-subtle">
				<div className="container mx-auto px-4 py-16 text-center">
					<h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
					<p className="text-muted-foreground mb-8">
						The article you&apos;re looking for doesn&apos;t exist.
					</p>
					<Link href="/blog">
						<button className="bg-blog-gradient hover:opacity-90">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Home
						</button>
					</Link>
				</div>
			</div>
		)
	}

	const relatedPosts = blogPosts
		.filter((p) => p.id !== post.id && p.category === post.category)
		.slice(0, 3)
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

	const handleCommentSubmit = (commentData) => {
		const newComment = {
			id: Date.now().toString(),
			name: commentData.name,
			email: commentData.email,
			content: commentData.content,
			timestamp: new Date(),
		}
		setComments([newComment, ...comments])
	}
	return (
		<div className="min-h-screen bg-background">
			<main>
				<div className="px-10 lg:px-20 py-8">
					<div className="grid lg:grid-cols-[1fr_320px] justify-between gap-12">
						{/* Main Content */}
						<article className="space-y-8">
							{/* Back Button */}
							<Link href="/blog" className="block">
								<button className="hover:text-primary transition transition-color duration-200 items-center inline-flex">
									<ArrowLeft className="h-4 w-4 mr-2" />
									Back to Articles
								</button>
							</Link>
							<header className="space-y-6">
								<div className="bg-primary/10 w-fit rounded-full py-px px-3 text-sm text-primary border-primary/20">
									{post.category}
								</div>

								<h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
									{post.title}
								</h1>

								<p className="text-xl text-muted-foreground leading-relaxed">
									{post.excerpt}
								</p>

								{/* Author and Meta */}
								<div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
									<div className="flex items-center space-x-4">
										<div className="h-12 w-12">
											<Image
												src="/600x400.svg"
												alt={post.author.name}
												width={600}
												height={400}
												className="h-full w-full object-cover rounded-full"
											/>
										</div>
										<div>
											<p className="font-medium">
												{post.author.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{post.author.role}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-4 text-sm text-muted-foreground">
										<div className="flex items-center space-x-1">
											<Calendar className="h-4 w-4" />
											<span>{post.publishedAt}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Clock className="h-4 w-4" />
											<span>{post.readTime}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Eye className="h-4 w-4" />
											<span>{post.views} views</span>
										</div>
									</div>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-2">
									{post.tags.map((tag, index) => (
										<div
											key={index}
											variant="outline"
											className="hover:bg-primary rounded-full bg-accent text-sm px-2  hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
										>
											#{tag}
										</div>
									))}
								</div>
							</header>
							{/* Featured Image */}
							<div className="relative overflow-hidden rounded-xl shadow-blog">
								<Image
									src="/600x400.svg"
									alt={post.title}
									width={600}
									height={400}
									className="w-full h-[400px] object-cover"
								/>
							</div>
							<div className="">{post.content}</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<button
										type="button"
										className="flex items-center px-4 py-2 border rounded-lg bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors group shadow-sm"
									>
										<Heart className="h-4 w-4 mr-2 group-hover:fill-current transition-all" />
										{post.likes} Likes
									</button>
									<button
										variant="outline"
										className="flex items-center px-4 py-2 border rounded-lg bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm"
									>
										<MessageCircle className="h-4 w-4 mr-2" />
										{post.comments} Comments
									</button>
								</div>
								<div className="flex items-center space-x-2">
									<button
										variant="outline"
										size="icon"
										className="bg-white text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg shadow-sm"
									>
										<Share2 className="h-4 w-4" />
									</button>
									<button
										variant="outline"
										size="icon"
										className="bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700 transition-colors rounded-lg shadow-sm"
									>
										<Bookmark className="h-4 w-4" />
									</button>
								</div>
							</div>

							{relatedPosts.length > 0 && (
								<section className="space-y-6">
									<h2 className="font-serif text-2xl font-bold">
										Related Articles
									</h2>
									<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
										{relatedPosts.map((relatedPost) => (
											<Link
												key={relatedPost.id}
												href={`/blog/${relatedPost.id}`}
											>
												<BlogCard>
													<Image
														src="/600x400.svg"
														alt="Blog image"
														width={400}
														height={200}
														className=" object-cover w-full h-[14rem] transition-transform duration-500 group-hover:scale-105"
													/>

													<BlogCardBodyWrapper>
														<BlogCardBody>
															<p className="inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground">
																{
																	relatedPost.category
																}
															</p>

															<BlogCardTitle
																title={
																	relatedPost.title
																}
															/>

															<BlogCardExcerpt
																excerpt={
																	relatedPost.excerpt
																}
															/>

															<BlogCardTags
																tags={
																	relatedPost.tags
																}
															/>
														</BlogCardBody>

														{/* Author */}
														<BlogCardAuthor>
															<Image
																src={
																	relatedPost
																		.author
																		.avatar ||
																	'/600x400.svg'
																}
																alt={
																	relatedPost
																		.author
																		.name
																}
																width={40}
																height={40}
																className="rounded-full h-10 w-10 object-top object-cover"
															/>
															<div>
																<p className="font-medium text-card-foreground">
																	{
																		relatedPost
																			.author
																			.name
																	}
																</p>
																<p className="text-sm text-muted-foreground">
																	{
																		relatedPost
																			.author
																			.role
																	}
																</p>
															</div>
														</BlogCardAuthor>

														<BlogCardMeta>
															<p className="inline-flex items-center gap-1">
																<Calendar
																	size={10}
																/>{' '}
																Aug 8
															</p>
															<p className="inline-flex items-center gap-1">
																<Clock
																	size={10}
																/>{' '}
																5 min
															</p>
															<p className="col-start-4 inline-flex items-center justify-end gap-1">
																<Eye
																	size={12}
																/>{' '}
																325
															</p>
														</BlogCardMeta>
													</BlogCardBodyWrapper>
												</BlogCard>
											</Link>
										))}
									</div>
								</section>
							)}
							{/* Comments Section */}
							<section className="space-y-8">
								<hr />
								{/* <CommentsList comments={comments} /> */}
								{/* <CommentForm onSubmit={handleCommentSubmit} /> */}
							</section>
							<div className="flex items-center justify-between mt-8">
								<button
									type="button"
									className="flex items-center px-4 py-2 border rounded-lg bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-primary transition-colors shadow-sm"
								>
									<ChevronLeft className="h-4 w-4 mr-2" />
									Previous Article
								</button>
								<button
									type="button"
									className="flex items-center px-4 py-2 border rounded-lg bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-primary transition-colors shadow-sm"
								>
									Next Article
									<ChevronRight className="h-4 w-4 ml-2" />
								</button>
							</div>
						</article>

						{/* <BlogSidebar /> */}
						<BlogSideBar>
							<BlogSubscribe />
							<BlogRecentPosts posts={recentPosts} />
						</BlogSideBar>
					</div>
				</div>
			</main>
		</div>
	)
}

export default page
