'use client'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '@/components/Table'
import { Edit, Ellipsis, Folder, Trash } from 'lucide-react'
import { useCategories } from './useCategories'
import Modal, { OpenModal, ViewModal } from '../Modal'
import Menus from '../Menu'
import CreateCategory from './CreateCategory'

function CategoriesList() {
	const { categories, isLoading } = useCategories()

	if (isLoading) return <h1>Loading...</h1>
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
										<Menus.Toggle id="category-action">
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
											id="category-action"
										>
											<OpenModal name="edit-category">
												<Menus.Button>
													<Edit size={15} /> Edit
												</Menus.Button>
											</OpenModal>
											<Menus.Button className="text-danger">
												<Trash
													className="text-inherit"
													size={15}
												/>
												Delete
											</Menus.Button>
										</Menus.MenuViews>

										<ViewModal
											title="Edit Post"
											name="edit-category"
										>
											<CreateCategory
												categoryData={category}
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
