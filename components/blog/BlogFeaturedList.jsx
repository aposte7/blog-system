import { getFeaturedPosts } from '@/data'
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

const BlogFeaturedList = () => {
	return (
		<div className="card-container flex flex-col justify-evenly gap-8 pt-8 min-[50rem]:flex-row lg:gap-12">
			{getFeaturedPosts().map((article, i) => (
				// <BlogCard key={i} {...article} />

				<Link key={article.id} href={`/blog/${article.id}`}>
					<BlogCard>
						<Image
							src="/600x400.svg"
							alt="Blog image"
							className=" object-cover w-full h-[14rem] transition-transform duration-500 group-hover:scale-105"
							width={400}
							height={200}
						/>

						<BlogCardBodyWrapper>
							<BlogCardBody>
								<p className="inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground">
									{article.category}
								</p>

								<BlogCardTitle title={article.title} />

								<BlogCardExcerpt excerpt={article.excerpt} />

								<BlogCardTags tags={article.tags} />
							</BlogCardBody>

							{/* Author */}
							<BlogCardAuthor>
								<Image
									src={
										article.author.avatar || '/600x400.svg'
									}
									alt={article.author.name}
									width={40}
									height={40}
									className="rounded-full h-10 w-10 object-top object-cover"
								/>
								<div>
									<p className="font-medium text-card-foreground">
										{article.author.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{article.author.role}
									</p>
								</div>
							</BlogCardAuthor>

							<BlogCardMeta>
								<p className="inline-flex items-center gap-1">
									<Calendar size={10} /> Aug 8
								</p>
								<p className="inline-flex items-center gap-1">
									<Clock size={10} /> 5 min
								</p>
								<p className="col-start-4 inline-flex items-center justify-end gap-1">
									<Eye size={12} /> 325
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
