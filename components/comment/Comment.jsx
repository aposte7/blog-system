const Comment = () => {
	return (
		<div className="mt-8">
			<div className="text-medium py-2 text-lg">Comments (2)</div>

			<div className="bg-card rounded-md border-border border  divide-primary/20  divide-y px-5 py-6 ">
				<div className=" flex py-2 gap-4 items-start">
					<div className="h-11 w-11 rounded-full bg-amber-300"></div>

					<div className="space-y-3">
						<div className="inline-flex gap-2  items-center">
							<p class="text-card-foreground ">Name</p>

							<p className="text-sm text-muted-foreground">
								1 minute ago
							</p>
						</div>
						<div className="text-muted-foreground capitalize">
							comment content
						</div>
					</div>
				</div>
				<div className=" flex py-2 gap-4 items-start">
					<div className="h-11 w-11 rounded-full bg-amber-300"></div>

					<div>
						<div className="inline-flex gap-2  items-center">
							<p class="text-card-foreground ">Name</p>

							<p className="text-sm text-muted-foreground">
								1 minute ago
							</p>
						</div>
						<div className="text-muted-foreground">
							comment content
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Comment
