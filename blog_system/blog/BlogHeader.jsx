import React from 'react'
import { ArrowRight, BookOpen, ChartLine, Users } from 'lucide-react'
import NavBar from '../NavBar'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const BlogHeader = () => {
	return (
		<header className="header bg-blog-gradient-subtle">
			<BlogHero>
				<BlogHeroText>
					<BlogHeroTitle>Welcome to Blogosphere</BlogHeroTitle>

					<BlogHeroHeader>
						Discover Amazing{' '}
						<span className="text-primary">Stories</span>
					</BlogHeroHeader>

					<BlogHeroDescription>
						Explore insightful articles on technology, design,
						business, and lifestyle. Join our community of
						passionate readers and writers.
					</BlogHeroDescription>

					<BlogHeroStatWrapper>
						<BlogHeroStat
							icon={
								<BookOpen
									size="1.2em"
									className="text-primary"
								/>
							}
						>
							<div>
								<p className="font-medium">144</p>
								<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
									Articles
								</p>
							</div>
						</BlogHeroStat>

						<BlogHeroStat
							icon={
								<Users size="1.2em" className="text-primary" />
							}
						>
							<div>
								<p className="font-medium">1.2K</p>
								<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
									Readers
								</p>
							</div>
						</BlogHeroStat>

						<BlogHeroStat
							icon={
								<ChartLine
									size="1.2em"
									className="text-primary"
								/>
							}
						>
							<div>
								<p className="font-medium">14.7K</p>
								<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
									Views
								</p>
							</div>
						</BlogHeroStat>
					</BlogHeroStatWrapper>

					<BlogHeroButtonWrapper>
						<button className="inline-flex items-center justify-center gap-5 rounded-lg bg-blog-gradient px-8 py-3 text-center text-base font-medium text-primary-foreground">
							<span>Start Reading</span>
							<ArrowRight size="1.1em" />
						</button>

						<button className="bg-muted inline-flex justify-center gap-5 rounded-lg border border-primary/10 hover:bg-primary/80 hover:text-primary-foreground px-8 py-3 text-center text-base font-medium text-black">
							<span>Browse Categories</span>
						</button>
					</BlogHeroButtonWrapper>
				</BlogHeroText>

				<BlogHeroImage>
					<Image
						src="/600x400.svg"
						alt="hero image"
						width={100}
						height={100}
						quality={100}
						className="h-full aspect-[16/9] w-full object-cover"
					/>
				</BlogHeroImage>
			</BlogHero>
		</header>
	)
}

export default BlogHeader

const BlogHero = ({ children, className }) => {
	return (
		<div
			className={cn(
				'hero grid items-center gap-8 px-5 pt-36 pb-24 lg:grid-cols-2 lg:px-10 xl:px-20',
				className
			)}
		>
			{children}
		</div>
	)
}

const BlogHeroText = ({ children, className }) => {
	return (
		<div className={cn('hero-text space-y-8', className)}>{children}</div>
	)
}

const BlogHeroImage = ({ children, className }) => {
	return (
		<div
			className={cn(
				'hero-image h-[28rem] overflow-hidden rounded-lg bg-amber-500',
				className
			)}
		>
			{children}
		</div>
	)
}

const BlogHeroTitle = ({ children, className }) => {
	return (
		<div
			className={cn(
				'inline-flex bg-bl rounded-full border border-primary/40 bg-primary/10 px-3 py-px text-sm font-medium text-primary lg:text-base',
				className
			)}
		>
			{children}
		</div>
	)
}
const BlogHeroHeader = ({ children, className }) => {
	return (
		<h1
			className={cn(
				'text-5xl text-foreground font-bold xl:text-6xl',
				className
			)}
		>
			{children}
		</h1>
	)
}
const BlogHeroDescription = ({ children, className }) => {
	return (
		<div
			className={cn(
				'max-w-[32rem] text-base text-muted-foreground md:text-lg lg:text-xl',
				className
			)}
		>
			{children}
		</div>
	)
}

const BlogHeroStatWrapper = ({ children, className }) => {
	return (
		<div
			className={cn(
				'hero-stat-wrapper flex items-center gap-10',
				className
			)}
		>
			{children}
		</div>
	)
}
const BlogHeroStat = ({ children, icon, className }) => {
	return (
		<div
			className={cn(
				'flex items-center hero-stat gap-3 text-base md:text-lg lg:gap-5 lg:text-2xl',
				className
			)}
		>
			{icon}
			{children}
		</div>
	)
}
const BlogHeroButtonWrapper = ({ children, className }) => {
	return (
		<div
			className={cn(
				'hero-button-wrapper flex flex-col gap-10 sm:flex-row',
				className
			)}
		>
			{children}
		</div>
	)
}

export {}
