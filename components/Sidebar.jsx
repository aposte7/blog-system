import {
	LayoutDashboard,
	ChartColumn,
	StickyNote,
	ShieldUser,
	Folder,
	MessageCircleIcon,
} from 'lucide-react'

import { default as Link } from 'next/link'

const Sidebar = () => {
	return (
		<aside className="space-y-12 overflow-y-scroll bg-white px-4 py-4 sm:px-8">
			<h2 className="inline-flex items-center gap-3 text-3xl font-bold">
				<LayoutDashboard
					size="1.3em"
					className="rounded-md bg-purple-500 p-1 text-white"
				/>
				Admin
			</h2>

			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					OVERVIEW
				</div>
				<Link
					href="/admin"
					className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
				>
					<LayoutDashboard
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Dashboard
				</Link>
			</div>

			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					content
				</div>
				<Link
					href="/admin/posts"
					className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
				>
					<StickyNote
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Posts
				</Link>
				<Link
					href="/admin/posts"
					className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
				>
					<MessageCircleIcon
						size="1.3em"
						className="rounded-md text-inherit"
					/>
					Comments
				</Link>
				<Link
					href="/admin/categories"
					className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
				>
					<Folder size="1.3em" className="rounded-md text-inherit" />
					Categories
				</Link>
			</div>
			<div className="space-y-1">
				<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
					Management
				</div>
				<Link
					href="/admin/admins"
					className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
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
