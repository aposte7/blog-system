import CreatePost from '@/components/blog/CreatePost'
import InputField from '@/components/InputField'
import Modal, { OpenModal, ViewModal } from '@/components/Modal'
import TableWrapper, {
	Table,
	TableContainer,
	TableData,
	TableRow,
} from '@/components/Table'
import { Ellipsis, Filter, Plus } from 'lucide-react'

const posts = [
	{
		title: 'Building Modern Web Applications with React 18',
		author: 'Sarah Johnson',
		category: 'Technology',
		status: 'Published',
		date: '1/15/2024',
		views: '2,543',
	},
	// Add more post entries as needed
]

const Page = () => {
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
							{posts.map((post, index) => (
								<TableRow key={index}>
									<TableData>
										<div className="max-w-[300px] truncate">
											{post.title}
										</div>
									</TableData>
									<TableData>{post.author}</TableData>
									<TableData>{post.category}</TableData>
									<TableData>
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
											{post.status}
										</span>
									</TableData>
									<TableData>{post.date}</TableData>
									<TableData>{post.views}</TableData>
									<TableData>
										<button
											className="rounded-sm px-1 py-1 transition-colors hover:bg-card"
											aria-label="More options"
										>
											<Ellipsis
												size={15}
												className="text-muted-foreground"
											/>
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

/*

<TableWrapper>
    <Table>
        <TableContainer elm="thead">
            <TableData elm="th">

            <TableData/>
        <TableContainer/>
    <Table>

<TableWrapper>



*/
