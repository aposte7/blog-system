'use client'

import { Edit, Ellipsis, Folder, Trash } from 'lucide-react'
import Menus from '../Menu'
import Modal, { OpenModal, ViewModal } from '../Modal'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '../Table'
import { useCategories } from './useCategories'
import useDeleteCategory from './useDeleteCategory'
import CreateCategory from './CreateCategory'
import PopupConfirm from '../PopupConfirm'

function CategoriesList() {
	const { categories, isLoading } = useCategories()
	const { deleteCategory, isDeleting } = useDeleteCategory()

	if (isLoading || isDeleting) return <h1>Loading...</h1>
	return (
		<TableWrapper>
			<Table>
				<TableContainer elm="thead" className="bg-indigo-50">
					<TableRow>
						<TableData elm="th">Category</TableData>
						<TableData elm="th">Slug</TableData>
						<TableData elm="th">Description</TableData>
						<TableData elm="th">Status</TableData>
						<TableData elm="th">Actions</TableData>
					</TableRow>
				</TableContainer>

				<TableContainer elm="tbody">
					{categories.map((category, index) => (
						<TableRow key={index}>
							<TableData>
								<div className="flex items-center gap-2.5 text-base">
									<span
										className="h-6 w-6 rounded-full"
										style={{
											backgroundColor: category.color,
										}}
									/>
									<Folder size="1.2em" />
									<p className="">{category.name}</p>
								</div>
							</TableData>
							<TableData>{category.slug}</TableData>
							<TableData>
								{
									<div className="group relative">
										<p className="max-w-[300px] truncate">
											{category.description}
										</p>
										<div className="absolute -top-[200%] left-1/2 z-10 mt-1 hidden w-full max-w-xs rounded bg-gray-700 px-2 py-1 text-sm text-white group-hover:block">
											{category.description}
										</div>
									</div>
								}
							</TableData>
							<TableData>
								<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
									{category.status || 'not active'}
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
											<OpenModal name="edit-category">
												<Menus.Button>
													<Edit size={15} /> Edit
												</Menus.Button>
											</OpenModal>

											<OpenModal name="delete-category">
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
											title="Edit Category"
											name="edit-category"
										>
											<CreateCategory
												categoryData={category}
											/>
										</ViewModal>

										<ViewModal
											title="Confirm  Your Action"
											name="delete-category"
											titleClass="text-sm"
										>
											<PopupConfirm
												onConfirm={() =>
													deleteCategory(category.id)
												}
												message={
													<>
														Are you sure you want to
														delete the category{' '}
														<strong>
															"{category.slug}"
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

export default CategoriesList
