import { Calendar, Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const BlogCard = ({ children, className = '' }) => {
	return (
		<div
			className={cn(
				'group cursor-pointer transition-all duration-300 hover:shadow-blog-hover shadow-blog hover:-translate-y-1 h-fit bg-card min-w-[23rem] overflow-hidden rounded-xl border border-border',
				className
			)}
		>
			{children}
		</div>
	)
}

export default BlogCard

const BlogCardImage = ({ imgUrl, alt, className = '' }) => {
	return (
		<div
			className={cn(
				'card-image-wrapper mb-5 h-[14rem] w-full',
				className
			)}
		>
			<Image
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				width={400}
				height={400}
				src={imgUrl}
				alt={alt}
			/>
		</div>
	)
}

const BlogCardBodyWrapper = ({ children, className = '' }) => {
	return (
		<div
			className={cn(
				'card-text divide-y divide-border px-6 pb-7 sm:px-8',
				className
			)}
		>
			{children}
		</div>
	)
}

const BlogCardBody = ({ children, className = '' }) => {
	return <div className={cn('space-y-3  py-4', className)}>{children}</div>
}

const BlogCardCategory = ({ category, className = '' }) => {
	return (
		<p
			className={cn(
				'inline-flex rounded-full bg-[#aeddffee] px-3 py-px text-sm text-foreground',
				className
			)}
		>
			{category}
		</p>
	)
}

const BlogCardTitle = ({ title, className = '' }) => {
	return (
		<h2
			className={cn(
				'text-lg transition-colors duration-300 group-hover:text-primary text-card-foreground font-semibold md:text-xl',
				className
			)}
		>
			{title}
		</h2>
	)
}

const BlogCardExcerpt = ({ excerpt, className = '' }) => {
	return (
		<p
			className={cn(
				'line-clamp-3 text-sm text-muted-foreground md:text-[15px]',
				className
			)}
		>
			{excerpt}
		</p>
	)
}

const BlogCardTags = ({ tags, className = '' }) => {
	return (
		<div className={cn('blog-tags flex flex-wrap gap-2', className)}>
			{tags.map((postTag, index) => (
				<p
					key={`${postTag.tag?.id}-${index}`}
					className="rounded-full border border-border text-foreground px-2 text-sm"
				>
					{postTag.tag?.name}
				</p>
			))}
		</div>
	)
}

const BlogCardAuthor = ({ children, className = '' }) => {
	return (
		<div
			className={cn(
				'blog-author flex items-center gap-3 py-3',
				className
			)}
		>
			{children}
		</div>
	)
}

const BlogCardMeta = ({ children, className = '' }) => {
	return (
		<div
			className={cn(
				'grid mt-3 grid-cols-[auto_4rem_1fr_5rem] justify-end gap-3 text-xs text-muted-foreground',
				className
			)}
		>
			{children}
		</div>
	)
}

export {
	BlogCardMeta,
	BlogCardAuthor,
	BlogCardTags,
	BlogCardExcerpt,
	BlogCardTitle,
	BlogCardCategory,
	BlogCardBodyWrapper,
	BlogCardImage,
	BlogCardBody,
}
