'use client'
import CreatePost from '@/blog_system/blog/CreatePost'
import { useDeletePost } from '@/blog_system/blog/useDeletePost'
import { usePosts } from '@/blog_system/blog/usePosts'
import { useUpdatePostFeatured } from '@/blog_system/blog/useUpdatePostFeatured'
import Menus from '@/blog_system/Menu'
import Modal, { OpenModal, ViewModal } from '@/blog_system/Modal'
import PopupConfirm from '@/blog_system/PopupConfirm'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '@/blog_system/Table'
import { dateToString } from '@/lib/utils'
import { Delete, Edit, Ellipsis, Star, Trash } from 'lucide-react'

const PostList = () => {
	const { posts, isLoading } = usePosts()
	const { isDeleting, deletePost } = useDeletePost()
	const { isUpdating, updatePostFeaturedStatus } = useUpdatePostFeatured()

	if (isLoading || isDeleting || isUpdating)
		return <p className="h-full w-full mx-auto">Loading...</p>

	return (
		<Modal>
			<TableWrapper>
				<Table>
					<TableContainer elm="thead">
						<TableRow className="hover:bg-amber-200">
							<TableData elm="th">Title</TableData>
							<TableData elm="th">Author</TableData>
							<TableData elm="th">Category</TableData>
							<TableData elm="th">Status</TableData>
							<TableData elm="th">Featured</TableData>
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
										<OpenModal
											name={`change-featured-${post.slug}`}
										>
											<button
												className={`rounded-sm mt-2 h-full inline-flex items-end text-center text-xs font-semibold  ${
													post.featured
														? 'text-green-600 bg-green-200'
														: 'bg-gray-400 text-gray-200'
												}  `}
											>
												<Star
													size={22}
													className="text-inherit  rounded-sm hover:bg-gray-300 p-0.5"
												/>
											</button>
										</OpenModal>

										<ViewModal
											name={`change-featured-${post.slug}`}
											title="Confirm Your Action"
											titleClass="text-sm"
										>
											<PopupConfirm
												onConfirm={() =>
													updatePostFeaturedStatus({
														postId: post.id,
														featured:
															!post.featured,
													})
												}
												message={
													<>
														{post.featured ? (
															<>
																Are you sure you
																want to{' '}
																<strong>
																	remove
																</strong>{' '}
																the featured
																status
																from&nbsp;
																<strong>
																	"{post.slug}
																	"
																</strong>
																?
															</>
														) : (
															<>
																Are you sure you
																want to{' '}
																<strong>
																	mark
																</strong>{' '}
																<strong>
																	"{post.slug}
																	"
																</strong>{' '}
																as featured?
															</>
														)}
													</>
												}
											/>
										</ViewModal>
									</TableData>
									<TableData>
										{dateToString(post.published_at)}
									</TableData>
									<TableData>{post.views}</TableData>
									<TableData className="relative z-50">
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
												title="Confirm Your Action"
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
									<span>
										Total: {posts.length} categories
									</span>
									<span className="text-xs">
										Last updated: {posts.updated_at || ''}
									</span>
								</div>
							</TableData>
						</TableRow>
					</TableContainer>
				</Table>
			</TableWrapper>
		</Modal>
	)
}

export default PostList
