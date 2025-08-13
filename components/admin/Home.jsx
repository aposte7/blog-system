import {
	Calendar,
	Edit,
	Eye,
	FileText,
	MessageSquare,
	TrendingUp,
	UserPlus,
} from 'lucide-react'
import Image from 'next/image'
import { DashboardChart } from './DashboardChart'
import { BlogRecentPosts } from '../blog/BlogHome'

const recentPosts = [
	{
		title: 'Building Modern Web Applications with React 18',
		status: 'Published',
		views: 1234,
		comments: 45,
		date: '2 days ago',
	},
	{
		title: 'The Future of Design Systems',
		status: 'Draft',
		views: 0,
		comments: 0,
		date: '5 days ago',
	},
	{
		title: 'Understanding TypeScript Generics',
		status: 'Published',
		views: 892,
		comments: 23,
		date: '1 week ago',
	},
]

const Home = () => {
	return (
		<section className="space-y-8  p-6">
			<div className="relative overflow-hidden rounded-lg bg-gradient-to-r bg-blog-gradient px-8 py-10">
				<h1 className="mb-3 text-3xl font-semibold text-white">
					Welcome to Admin Dashboard
				</h1>
				<p className="text-lg text-white">
					Manage your blog content and monitor your site's performance
				</p>
				<div className="absolute top-0 right-0 h-full w-1/3 opacity-20">
					<Image
						src="/admin-hero.jpg"
						className="h-full w-full scale-105 object-cover"
						alt="dashboard image"
						height={40}
						width={100}
					/>
				</div>
			</div>

			<div className="flex flex-wrap gap-5">
				<div className="min-w-[15rem] flex-1 space-y-2 rounded-lg border border-slate-200 bg-white p-6">
					<div className="flex justify-between text-base text-slate-500">
						<p className="font-medium">Total Posts</p>
						<FileText size="1.1em" className="text-inherit" />
					</div>

					<div className="space-y-2">
						<p className="text-2xl font-medium">144</p>
						<p className="inline-flex items-center gap-2 text-sm text-slate-500">
							<TrendingUp
								size="1.2em"
								className="text-green-600"
							/>{' '}
							+ 12 % from last month
						</p>
					</div>
				</div>
				<div className="min-w-[15rem] flex-1 space-y-2 rounded-lg border border-slate-200 bg-white p-6">
					<div className="flex justify-between text-base text-slate-500">
						<p className="font-medium">Page Views</p>
						<Eye size="1.1em" className="text-inherit" />
					</div>

					<div className="space-y-2">
						<p className="text-2xl font-medium">13.4k</p>
						<p className="inline-flex items-center gap-2 text-sm text-slate-500">
							<TrendingUp
								size="1.2em"
								className="text-green-600"
							/>{' '}
							+ 12 % from last month
						</p>
					</div>
				</div>
				<div className="min-w-[15rem] flex-1 space-y-2 rounded-lg border border-slate-200 bg-white p-6">
					<div className="flex justify-between text-base text-slate-500">
						<p className="font-medium">Total Admin</p>
						<UserPlus size="1.1em" className="text-inherit" />
					</div>

					<div className="space-y-2">
						<p className="text-2xl font-medium">14</p>
					</div>
				</div>
			</div>

			<DashboardChart />

			<div className="rounded-xl border border-border bg-card shadow-sm">
				<div className=" p-4">
					<h2 className="text-lg bg-fo font-semibold">
						Recent Posts
					</h2>
				</div>

				<div className="p-4 space-y-4">
					<div className="rounded-xl border border-border bg-card shadow-sm">
						<BlogRecentPosts />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Home
