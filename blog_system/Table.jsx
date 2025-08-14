import { cn } from '@/lib/utils'
import { createElement } from 'react'

function TableWrapper({ children, className = '' }) {
	return (
		<div
			className={`w-full overflow-x-auto  rounded-md border border-slate-200 shadow-sm ${className}`}
		>
			{children}
		</div>
	)
}

const Table = ({ children, className = '' }) => {
	return (
		<table className={`w-full table-auto ${className}`}>{children}</table>
	)
}

const TableContainer = ({ elm = 'thead', children, style = '' }) => {
	const baseClasses = `[&_tr]:border-b ${
		!elm == 'thead' && '[&_tr:last-child]:border-0'
	}`

	return createElement(elm, { className: cn(baseClasses, style) }, children)
}

const TableRow = ({ children, className = '' }) => {
	return (
		<tr
			className={cn(
				'border-b-border transition-colors hover:bg-muted has-[th]:bg-primary/5  ',
				className
			)}
		>
			{children}
		</tr>
	)
}

const TableData = ({ elm = 'td', children, className = '', ...props }) => {
	const baseClass =
		elm === 'td'
			? 'px-4 py-3 align-middle'
			: 'h-12 px-4 text-left align-middle font-medium text-slate-600'
	return createElement(
		elm,
		{ className: `${baseClass} ${className}`, ...props },
		children
	)
}

export default TableWrapper
export { Table, TableContainer, TableRow, TableData }
