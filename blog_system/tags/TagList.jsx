'use client'
import { Edit, Ellipsis, Tag, Trash } from 'lucide-react'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '../Table'
import { useTags } from './useTags'
import Modal, { OpenModal, ViewModal } from '../Modal'
import Menus from '../Menu'
import CreateTag from './CreateTag'
import PopupConfirm from '../PopupConfirm'
import useDeleteTags from './useDeleteTags'

function TagList() {
	const { isLoading, tags } = useTags()
	const { isDeleting, deleteTag } = useDeleteTags()

	if (isLoading || isDeleting) return <h1>Loading...</h1>

	return (
		<TableWrapper>
			<Table>
				<TableContainer elm="thead" className="bg-indigo-50">
					<TableRow>
						<TableData elm="th">Tag</TableData>
						<TableData elm="th">Slug</TableData>
						<TableData elm="th">Description</TableData>
						<TableData elm="th">Status</TableData>
						<TableData elm="th">Actions</TableData>
					</TableRow>
				</TableContainer>

				<TableContainer elm="tbody">
					{tags.map((tag, index) => (
						<TableRow key={index}>
							<TableData>
								<div className="flex items-center gap-2.5 text-base">
									<span
										className="h-4 w-4 rounded-full"
										style={{
											backgroundColor:
												tag?.color || '#333',
										}}
									/>
									<Tag size="1.2em" />
									<p className="">{tag.name}</p>
								</div>
							</TableData>
							<TableData>{tag.slug}</TableData>
							<TableData>
								{
									<div className="group relative">
										<p className="max-w-[300px] truncate">
											{tag.description}
										</p>
										<div className="absolute -top-[200%] left-1/2 z-10 mt-1 hidden w-full max-w-xs rounded bg-gray-700 px-2 py-1 text-sm text-white group-hover:block">
											{tag.description}
										</div>
									</div>
								}
							</TableData>
							<TableData>
								<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
									{tag.status}
								</span>
							</TableData>

							<TableData className="relative z-50">
								<Modal>
									<Menus>
										<Menus.Toggle id="tag-action">
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
											id="tag-action"
										>
											<OpenModal name="edit-tag">
												<Menus.Button>
													<Edit size={15} /> Edit
												</Menus.Button>
											</OpenModal>

											<OpenModal name="delete-tag">
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
											title="Edit Tag"
											name="edit-tag"
										>
											<CreateTag tagData={tag} />
										</ViewModal>

										<ViewModal
											title="Confirm  Your Action"
											name="delete-tag"
											titleClass="text-sm"
										>
											<PopupConfirm
												onConfirm={() =>
													deleteTag(tag.id)
												}
												message={
													<>
														Are you sure you want to
														delete the tag{' '}
														<strong>
															"{tag.name}"
														</strong>
														? This action cannot be
														undone.
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
			</Table>
		</TableWrapper>
	)
}

export default TagList
