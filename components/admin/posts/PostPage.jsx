import CreatePost from '@/components/blog/CreatePost'
import InputField from '@/components/InputField'
import Modal, { OpenModal, ViewModal } from '@/components/Modal'

import { Filter, Plus } from 'lucide-react'
import PostList from './PostList'

const PostPage = () => {
	return (
		<div className="p-6 flex flex-col h-full">
			{/* <CreatePost /> */}

			<div className="grid grid-cols-[max-content_auto] grid-rows-2 items-start justify-between gap-x-10">
				<h1 className="text-3xl text-card-foreground font-bold">
					Posts
				</h1>
				<p className="text-muted-foreground">
					Manage your blog posts and articles
				</p>
				<Modal>
					<OpenModal name="create-blog">
						<button className="col-start-2 row-start-1 inline-flex items-center gap-3 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
							<Plus
								strokeWidth={2.5}
								className="text-inherit"
								size="1.2em"
							/>
							New Post
						</button>
					</OpenModal>

					<ViewModal title="Create New Post" name="create-blog">
						<CreatePost />
					</ViewModal>
				</Modal>
			</div>

			<div className="mt-2 flex-1 space-y-4 rounded-md border border-border bg-card p-6">
				<h2 className="text-2xl text-card-foreground font-medium">
					Manage Posts
				</h2>
				<div className="flex gap-5">
					<InputField
						type="text"
						placeholder="Search post.."
						className="w-[23rem] min-w-[15rem] text-sm"
					/>

					<button className="inline-flex items-center gap-3 rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground focus:ring focus:ring-primary focus:ring-offset-1">
						<Filter className="text-inherit" size="1.1em" />
						Filter
					</button>
				</div>
				<PostList />
			</div>
		</div>
	)
}

export default PostPage
