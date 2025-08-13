import { timeAgo } from '@/lib/utils'
import Empty from '../Empty'
import { Loading } from '../Loading'
import { useComments } from './useComments'

const Comment = ({ params }) => {
	const { isLoading, comments } = useComments(params)

	return (
		<div className="mt-8">
			<div className="text-medium py-2 text-lg">
				Comments ({comments?.length || 0})
			</div>

			<div className="bg-card rounded-md border-border border divide-primary/20 divide-y px-5 py-6">
				{isLoading ? (
					<Loading />
				) : comments.length === 0 ? (
					<Empty title="No Comments">
						<p className="text-sm text-muted-foreground italic py-4 text-center">
							Be the first to comment…
						</p>
					</Empty>
				) : (
					comments?.map((comment, index) => (
						<div
							key={index}
							className="flex py-2 gap-4 items-start"
						>
							<div className="h-11 w-11 rounded-full bg-amber-300"></div>

							<div className="space-y-3">
								<div className="inline-flex gap-2 items-center">
									<p className="text-card-foreground">
										{comment.author_name}
									</p>
									<p className="text-sm text-muted-foreground">
										{timeAgo(comment.created_at)}
									</p>
								</div>
								<div className="text-muted-foreground capitalize">
									{comment.content}
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default Comment
