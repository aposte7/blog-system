import { Filter, Plus } from 'lucide-react'
import Modal, { OpenModal, ViewModal } from '../Modal'
import CreateTag from './CreateTag'
import TagList from './TagList'

function Tags() {
	return (
		<div className="p-6">
			<div className="grid grid-cols-[max-content_auto] grid-rows-2 items-start justify-between gap-x-10">
				<h1 className="text-3xl font-bold">Tags</h1>
				<p className="text-slate-500">
					Organize your content with Tags
				</p>

				<Modal>
					<OpenModal name="create-tags">
						<button className="col-start-2 row-start-1 inline-flex items-center gap-3 rounded-sm bg-purple-500 px-5 py-2.5 text-sm font-medium text-white">
							<Plus
								strokeWidth={2.5}
								className="text-inherit"
								size="1.2em"
							/>{' '}
							New Tag
						</button>
					</OpenModal>
					<ViewModal title="New Tag" name="create-tags">
						<CreateTag />
					</ViewModal>
				</Modal>
			</div>
			<div className="flex flex-wrap items-start gap-4">
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Total Tags
					</p>
				</div>
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Active Tags
					</p>
				</div>
				<div className="min-w-[13rem] flex-1 rounded-md border border-slate-300 bg-white p-6">
					<p className="text-3xl font-medium">5</p>
					<p className="text-light text-sm text-slate-500">
						Total Posts
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

				<TagList />
			</div>
		</div>
	)
}

export default Tags
