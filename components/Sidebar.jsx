'use client'

import { cn } from '@/lib/utils'
import {
	LayoutDashboard,
	StickyNote,
	ShieldUser,
	Folder,
	MessageCircleIcon,
	Tag,
} from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()

	const linkClasses = (href) =>
		cn(
			'inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm transition-colors',
			pathname === href
				? 'bg-primary text-white font-medium'
				: 'text-slate-500 hover:bg-primary/80 hover:text-white'
		)

	return (
		<aside className="space-y-12 overflow-y-scroll bg-white px-4 py-4 sm:px-8">
			{/* Logo / Title */}
			<h2 className="inline-flex items-center gap-3 text-3xl font-bold">
				<LayoutDashboard
					size="1.3em"
					className="rounded-md bg-purple-500 p-1 text-white"
				/>
				Admin
			</h2>

			{/* Overview */}
			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					OVERVIEW
				</div>
				<Link href="/admin" className={linkClasses('/admin')}>
					<LayoutDashboard
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Dashboard
				</Link>
			</div>

			{/* Content */}
			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					Content
				</div>
				<Link
					href="/admin/posts"
					className={linkClasses('/admin/posts')}
				>
					<StickyNote
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Posts
				</Link>
				<Link
					href="/admin/comments"
					className={linkClasses('/admin/comments')}
				>
					<MessageCircleIcon
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Comments
				</Link>
				<Link
					href="/admin/categories"
					className={linkClasses('/admin/categories')}
				>
					<Folder size="1.3em" className="rounded-md text-inherit" />
					Categories
				</Link>
				<Link href="/admin/tags" className={linkClasses('/admin/tags')}>
					<Tag size="1.3em" className="rounded-md text-inherit" />
					Tags
				</Link>
			</div>

			{/* Management */}
			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					Management
				</div>
				<Link
					href="/admin/users"
					className={linkClasses('/admin/users')}
				>
					<ShieldUser
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Admins
				</Link>
			</div>
		</aside>
	)
}

export default Sidebar
