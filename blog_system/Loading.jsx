import { cn } from '@/lib/utils'

export const Loading = ({ message, className }) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center py-16 text-center',
				className
			)}
		>
			<div className="animate-spin rounded-full border-4 border-muted border-t-primary h-10 w-10 mb-4"></div>
			<p className="text-muted-foreground">{message}</p>
		</div>
	)
}
