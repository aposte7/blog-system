import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '@/components/Table'
import { Filter, Folder, Plus } from 'lucide-react'

const posts = [
	{
		slug: 'technology',
		category: 'Technology',
		description:
			'Articles about programming, web development, and tech trends',
		posts: '45',
		status: 'Active',
		color: '#164cff',
	},
]
function Page() {
	return (
		<div className="p-6">
			<div className="grid grid-cols-[max-content_auto] grid-rows-2 items-start justify-between gap-x-10">
				<h1 className="text-3xl font-bold">Categories</h1>
				<p className="text-slate-500">
					Organize your content with categories
				</p>

				<button className="col-start-2 row-start-1 inline-flex items-center gap-3 rounded-sm bg-purple-500 px-5 py-2.5 text-sm font-medium text-white">
					<Plus
						strokeWidth={2.5}
						className="text-inherit"
						size="1.2em"
					/>{' '}
					New Category
				</button>
			</div>
			<div className="flex flex-wrap items-start gap-4">
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Total Categories
					</p>
				</div>
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Active Categories
					</p>
				</div>
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Total Posts
					</p>
				</div>
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Avg Posts/Category
					</p>
				</div>
			</div>
			<div className="mt-6 space-y-4 rounded-sm border border-slate-300 bg-white p-6">
				<h2 className="text-2xl font-medium">Manage Posts</h2>

				<div className="flex justify-between gap-5 sm:justify-baseline">
					<input
						type="text"
						placeholder="Search post.."
						className="w-[23rem] min-w-[15rem] rounded-sm border border-slate-300 px-3 py-2 text-sm focus:ring focus:ring-purple-600 focus:ring-offset-1 focus:outline-none"
					/>

					<button className="inline-flex items-center gap-3 rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 focus:ring focus:ring-purple-600 focus:ring-offset-1">
						<Filter className="text-inherit" size="1.1em" />
						Filter
					</button>
				</div>

				<TableWrapper>
					<Table>
						<TableContainer elm="thead" className="bg-indigo-50">
							<TableRow>
								<TableData elm="th">Category</TableData>
								<TableData elm="th">Slug</TableData>
								<TableData elm="th">Description</TableData>
								<TableData elm="th">Posts</TableData>
								<TableData elm="th">Status</TableData>
								<TableData elm="th">Actions</TableData>
							</TableRow>
						</TableContainer>

						<TableContainer elm="tbody">
							{posts.map((post, index) => (
								<TableRow key={index}>
									<TableData>
										<div className="flex items-center gap-2.5 text-base">
											<span
												className="h-6 w-6 rounded-full"
												style={{
													backgroundColor: post.color,
												}}
											/>
											<Folder size="1.2em" />
											<p className="">{post.category}</p>
										</div>
									</TableData>
									<TableData>{post.slug}</TableData>
									<TableData>
										{
											<div className="group relative">
												<p className="max-w-[300px] truncate">
													{post.description}
												</p>
												<div className="absolute -top-[200%] left-1/2 z-10 mt-1 hidden w-full max-w-xs rounded bg-gray-700 px-2 py-1 text-sm text-white group-hover:block">
													{post.description}
												</div>
											</div>
										}
									</TableData>
									<TableData>{post.posts}</TableData>
									<TableData>
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
											{post.status}
										</span>
									</TableData>

									<TableData>
										<button
											className="rounded-full p-2 transition-colors hover:bg-gray-100"
											aria-label="More options"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 text-gray-600"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<circle cx="12" cy="12" r="1" />
												<circle cx="19" cy="12" r="1" />
												<circle cx="5" cy="12" r="1" />
											</svg>
										</button>
									</TableData>
								</TableRow>
							))}
						</TableContainer>
					</Table>
				</TableWrapper>
			</div>
		</div>
	)
}

export default Page
