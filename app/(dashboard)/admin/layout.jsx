import InputField from '@/components/InputField'
import {
	ChartBarStacked,
	ChartColumn,
	Folder,
	LayoutDashboard,
	LogOut,
	PanelLeft,
	ShieldUser,
	StickyNote,
	Tag,
	Tags,
	Users,
} from 'lucide-react'

const Layout = ({ children }) => {
	return (
		<main className="grid min-h-dvh grid-cols-[18rem_1fr] grid-rows-[auto_1fr]">
			<aside className="row-span-2 space-y-12 overflow-y-scroll bg-white px-4 py-4 sm:px-8">
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
					<button className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium">
						<LayoutDashboard
							size="1.3em"
							className="rounded-md text-inherit"
						/>
						Dashboard
					</button>
					<button className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium">
						<ChartColumn
							size="1.3em"
							className="rounded-md text-inherit"
						/>
						Analytics
					</button>
				</div>

				<div className="space-y-1">
					<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
						content
					</div>
					<button className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium">
						<StickyNote
							size="1.3em"
							className="rounded-md text-inherit"
						/>
						Posts
					</button>
					<a
						href="/admin/categories"
						className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium"
					>
						<Folder
							size="1.3em"
							className="rounded-md text-inherit"
						/>
						Categories
					</a>
					<button className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium">
						<Tag size="1.3em" className="rounded-md text-inherit" />
						Tags
					</button>
				</div>
				<div className="space-y-1">
					<div className="pb-2 text-xs font-medium text-slate-500 uppercase">
						Management
					</div>
					<button className="inline-flex w-full items-center gap-3 rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-purple-500 hover:text-white active:bg-purple-500 active:font-medium">
						<ShieldUser
							size="1.3em"
							className="rounded-md text-inherit"
						/>
						Admins
					</button>
				</div>
			</aside>
			<nav className="flex justify-between border-b border-b-slate-300 bg-white px-4 py-3">
				<div className="flex items-center gap-4">
					<PanelLeft className="text-slate-500" />

					<InputField
						className="w-[20rem] min-w-[15rem]"
						type="text"
						placeholder="Search..."
					/>
				</div>

				<div className="flex gap-6">
					<div className="inline-flex items-center gap-4">
						<p>Hiikaa </p>
						<img
							src="/kk"
							alt=""
							className="h-10 w-10 rounded-full bg-blue-500"
						/>
					</div>
					<div className="inline-flex items-center gap-4">
						<LogOut />
					</div>
				</div>
			</nav>
			<div className="overflow-y-scroll bg-blue-100">{children}</div>
		</main>
	)
}

export default Layout
