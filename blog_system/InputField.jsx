import { cn } from '@/lib/utils'

const InputField = ({ className = '', ...props }) => {
	return (
		<input
			className={cn(
				'w-full rounded-md border border-border px-4 py-[7px] focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none',
				className
			)}
			{...props}
		/>
	)
}

export default InputField
