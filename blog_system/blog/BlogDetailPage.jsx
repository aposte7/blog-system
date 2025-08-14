'use client'
import Empty from '../Empty'
import MarkdownEditor from '@uiw/react-md-editor'
import { BlogRecentPosts, BlogSideBar, BlogSubscribe } from './BlogHome'
import {
	ArrowLeft,
	Bookmark,
	Calendar,
	Clock,
	Eye,
	MessageCircle,
	Share2,
} from 'lucide-react'
import { Loading } from '../Loading'
import { usePost } from './usePost'
import Link from 'next/link'
import Image from 'next/image'
import BlogCard, {
	BlogCardBody,
	BlogCardBodyWrapper,
	BlogCardExcerpt,
	BlogCardMeta,
	BlogCardTitle,
} from './BlogCard'
import { useRelatedPosts } from './useRelatedPost'
import { dateToString } from '@/lib/utils'
import CommentForm from '../comment/CommentForm'
import Comment from '../comment/Comment'

const BlogDetailPage = ({ params }) => {
	const { post, isLoading } = usePost(params)

	if (isLoading) {
		return <Loading message="loading..." />
	}

	if (!post) {
		return (
			<Empty title="No Post Is Found">
				<div>
					<p className="text-muted-foreground mb-8">
						The article you&apos;re looking for doesn&apos;t exist.
					</p>
					<Link href="/blog">
						<button className="bg-blog-gradient rounded text-card py-1.5 px-4 hover:opacity-90 flex items-center">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Home
						</button>
					</Link>
				</div>
			</Empty>
		)
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
									{post.category?.name}
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
												src={
													post.author.avatar ||
													'/600x400.svg'
												}
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
												{post.author.company_role}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-4 text-sm text-muted-foreground">
										<div className="flex items-center space-x-1">
											<Calendar className="h-4 w-4" />
											<span>
												{new Date(
													post.published_at
												).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center space-x-1">
											<Clock className="h-4 w-4" />
											<span>{post.read_time} min</span>
										</div>
										<div className="flex items-center space-x-1">
											<Eye className="h-4 w-4" />
											<span>{post.views} views</span>
										</div>
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									{post.post_tags.map((item, index) => (
										<div
											key={index}
											className="hover:bg-primary rounded-full bg-accent text-sm px-2 hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
										>
											#{item.tag.name}
										</div>
									))}
								</div>
							</header>
							{/* Featured Image */}
							<div className="relative overflow-hidden rounded-xl shadow-blog">
								<Image
									src={post.featured_image || '/600x400.svg'}
									alt={post.title}
									width={600}
									height={400}
									className="w-full h-[400px] object-cover"
								/>
							</div>
							<div data-color-mode="light" className="bg-card">
								<MarkdownEditor.Markdown
									source={post.content}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<button className="flex items-center px-4 py-2 border rounded-lg bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm">
										<MessageCircle className="h-4 w-4 mr-2" />
										{post.comments.length} Comments
									</button>
								</div>
								<div className="flex items-center space-x-2">
									<button className="bg-white text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg shadow-sm">
										<Share2 className="h-4 w-4" />
									</button>
									<button className="bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700 transition-colors rounded-lg shadow-sm">
										<Bookmark className="h-4 w-4" />
									</button>
								</div>
							</div>
							<RelatedPost
								categoryId={post.category?.id}
								currentPostId={post.id}
							/>
							<section className="space-y-8">
								<hr />
								<section className="space-y-8">
									<hr />
									<CommentForm params={params} />
									<Comment params={params} />
								</section>
							</section>
						</article>

						<BlogSideBar>
							<BlogSubscribe />
							<BlogRecentPosts />
						</BlogSideBar>
					</div>
				</div>
			</main>
		</div>
	)
}

export default BlogDetailPage

const RelatedPost = ({ categoryId, currentPostId }) => {
	const { relatedPosts, isLoading } = useRelatedPosts({
		categoryId,
		currentPostId,
	})

	if (isLoading) return <Loading />
	if (relatedPosts?.length === 0) {
		return
	}

	return (
		<section className="space-y-6">
			<h2 className="font-serif text-2xl font-bold">Related Articles</h2>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
				{relatedPosts.map((relatedPost) => (
					<Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
						<BlogCard className="">
							<Image
								src={relatedPost.featured_image}
								alt="Blog image"
								width={400}
								height={200}
								className=" object-cover w-full h-[11rem] transition-transform duration-500 group-hover:scale-105"
							/>

							<BlogCardBodyWrapper>
								<BlogCardBody>
									<p className="inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground">
										{relatedPost?.category?.name ||
											'Unknown'}
									</p>

									<BlogCardTitle
										title={relatedPost.title}
										className="md:text-base"
									/>

									<BlogCardExcerpt
										excerpt={relatedPost.excerpt}
									/>
								</BlogCardBody>

								<BlogCardMeta>
									<p className="inline-flex items-center gap-1">
										<Calendar size={10} />{' '}
										{dateToString(relatedPost.published_at)}
									</p>
									<p className="inline-flex items-center gap-1">
										<Clock size={10} />{' '}
										{relatedPost?.read_time} min
									</p>
									<p className="col-start-4 inline-flex items-center justify-end gap-1">
										<Eye size={12} /> {relatedPost.views}
									</p>
								</BlogCardMeta>
							</BlogCardBodyWrapper>
						</BlogCard>
					</Link>
				))}
			</div>
		</section>
	)
}
