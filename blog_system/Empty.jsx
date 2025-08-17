const Empty = ({ title, children }) => {
	return (
		<div className="flex flex-col h-full items-center justify-center py-20 text-center space-y-4 border border-dashed border-muted rounded-xl bg-muted/80">
			<h3 className="text-lg font-semibold text-foreground">{title}</h3>
			{children}
		</div>
	)
}

export default Empty
