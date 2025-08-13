'use client'
import CreatePost from '@/components/blog/CreatePost'
import { useDeletePost } from '@/components/blog/useDeletePost'
import { usePosts } from '@/components/blog/usePosts'
import Menus from '@/components/Menu'
import Modal, { OpenModal, ViewModal } from '@/components/Modal'
import PopupConfirm from '@/components/PopupConfirm'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '@/components/Table'
import { dateToString } from '@/lib/utils'
import { Delete, Edit, Ellipsis, Trash } from 'lucide-react'

const PostList = () => {
	const { posts, isLoading } = usePosts()
	const { isDeleting, deletePost } = useDeletePost()

	if (isLoading || isDeleting)
		return <p className="h-full w-full mx-auto">Loading...</p>

	return (
		<TableWrapper>
			<Table>
				<TableContainer elm="thead">
					<TableRow className="hover:bg-amber-200">
						<TableData elm="th">Title</TableData>
						<TableData elm="th">Author</TableData>
						<TableData elm="th">Category</TableData>
						<TableData elm="th">Status</TableData>
						<TableData elm="th">Date</TableData>
						<TableData elm="th">Views</TableData>
						<TableData elm="th">Action</TableData>
					</TableRow>
				</TableContainer>
				<TableContainer elm="tbody">
					{posts?.length > 0 &&
						posts.map((post, index) => (
							<TableRow key={index}>
								<TableData>
									<div className="max-w-[300px] truncate">
										{post.title}
									</div>
								</TableData>
								<TableData>
									{post.author?.name || '....'}
								</TableData>
								<TableData>
									{post.category?.name || '....'}
								</TableData>
								<TableData>
									<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
										{post.status}
									</span>
								</TableData>
								<TableData>
									{dateToString(post.published_at)}
								</TableData>
								<TableData>{post.views}</TableData>
								<TableData className="relative z-50">
									<Modal>
										<Menus>
											<Menus.Toggle id="post-action">
												<button
													className="rounded-sm px-1 py-1 transition-colors hover:bg-card"
													aria-label="More options"
												>
													<Ellipsis
														size={15}
														className="text-muted-foreground"
													/>
												</button>
											</Menus.Toggle>
											<Menus.MenuViews
												className="absolute  overflow-visible -top-[100%] left-0"
												id="post-action"
											>
												<OpenModal name="edit-post">
													<Menus.Button>
														<Edit size={15} /> Edit
													</Menus.Button>
												</OpenModal>

												<OpenModal name="delete-post">
													<Menus.Button className="text-danger">
														<Trash
															className="text-inherit"
															size={15}
														/>
														Delete
													</Menus.Button>
												</OpenModal>
											</Menus.MenuViews>

											<ViewModal
												title="Edit Post"
												name="edit-post"
											>
												<CreatePost postData={post} />
											</ViewModal>

											<ViewModal
												title="Confirm  Your Action"
												name="delete-post"
												titleClass="text-sm"
											>
												<PopupConfirm
													onConfirm={() =>
														deletePost(post.id)
													}
													message={
														<>
															Are you sure you
															want to delete the
															post{' '}
															<strong>
																"{post.slug}"
															</strong>
															? This action cannot
															be undone.
														</>
													}
												/>
											</ViewModal>
										</Menus>
									</Modal>
								</TableData>
							</TableRow>
						))}
				</TableContainer>
				<TableContainer elm="tfoot">
					<TableRow>
						<TableData
							elm="td"
							colSpan={8}
							className="py-2 px-4 text-sm text-gray-500"
						>
							<div className="flex justify-between items-center">
								<span>Total: {posts.length} categories</span>
								<span className="text-xs">
									Last updated: {posts.updated_at || ''}
								</span>
							</div>
						</TableData>
					</TableRow>
				</TableContainer>
			</Table>
		</TableWrapper>
	)
}

export default PostList
