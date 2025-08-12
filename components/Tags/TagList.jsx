'use client'
import { Ellipsis, Tag } from 'lucide-react'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '../Table'
import { useTags } from './useTags'

function TagList() {
	const { isLoading, tags } = useTags()

	if (isLoading) return <h1>Loading...</h1>

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

							<TableData>
								<Ellipsis />
							</TableData>
						</TableRow>
					))}
				</TableContainer>
			</Table>
		</TableWrapper>
	)
}

export default TagList
