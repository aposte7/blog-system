'use client'
import Link from 'next/link'
import BlogCard, {
	BlogCardAuthor,
	BlogCardBody,
	BlogCardBodyWrapper,
	BlogCardExcerpt,
	BlogCardMeta,
	BlogCardTags,
	BlogCardTitle,
} from './BlogCard'
import Image from 'next/image'
import { Calendar, Clock, Eye } from 'lucide-react'
import { usePosts } from './usePosts'
import { Loading } from '../Loading'
import Empty from '../Empty'
import { dateToString } from '@/lib/utils'

const BlogFeaturedList = () => {
	const { isLoading, posts } = usePosts()

	if (isLoading) return <Loading message="Loading featured posts..." />

	const featuredPosts = posts.filter((post) => post.featured)

	if (featuredPosts.length === 0) {
		return (
			<Empty title="No Featured Posts Yet">
				<p className="text-sm text-muted-foreground max-w-sm">
					It seems there are no featured articles right now. Please
					check back later or explore other sections of our blog.
				</p>
			</Empty>
		)
	}

	return (
		<div className="card-container flex flex-col justify-evenly gap-8 pt-8 min-[50rem]:flex-row lg:gap-12">
			{featuredPosts.map((article) => (
				<Link key={article.id} href={`/blog/${article.id}`}>
					<BlogCard>
						<Image
							src={article.featured_image}
							alt="Blog image"
							className="object-cover w-full h-[14rem] transition-transform duration-500 group-hover:scale-105"
							width={400}
							height={200}
						/>

						<BlogCardBodyWrapper>
							<BlogCardBody>
								<p className="inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground">
									{article?.category?.name || 'Unknown'}
								</p>

								<BlogCardTitle title={article.title} />

								<BlogCardExcerpt excerpt={article.excerpt} />

								<BlogCardTags tags={article.post_tags} />
							</BlogCardBody>

							{/* Author */}
							<BlogCardAuthor>
								<Image
									src={'/600x400.svg'}
									alt={
										article.author?.name ||
										'author placeholder'
									}
									width={40}
									height={40}
									className="rounded-full h-10 w-10 object-top object-cover"
								/>
								<div>
									<p className="font-medium text-card-foreground">
										{article.author.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{article.author.email}
									</p>
								</div>
							</BlogCardAuthor>

							<BlogCardMeta>
								<p className="inline-flex items-center gap-1">
									<Calendar size={10} />
									{dateToString(article.published_at)}
								</p>
								<p className="inline-flex items-center gap-1">
									<Clock size={10} /> {article.read_time} min
								</p>
								<p className="col-start-4 inline-flex items-center justify-end gap-1">
									<Eye size={12} /> {article.views}
								</p>
							</BlogCardMeta>
						</BlogCardBodyWrapper>
					</BlogCard>
				</Link>
			))}
		</div>
	)
}

export default BlogFeaturedList
