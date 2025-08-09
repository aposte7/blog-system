function TableWrapper({ children, className = '' }) {
	return (
		<div
			className={`w-full overflow-x-auto rounded-md border border-slate-200 shadow-sm ${className}`}
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

const TableContainer = ({ elm = 'thead', children, className = '' }) => {
	const baseClasses = `[&_tr]:border-b ${
		!elm == 'thead' && '[&_tr:last-child]:border-0'
	}`
	return React.createElement(
		elm,
		{ className: `${baseClasses} ${className}` },
		children
	)
}

const TableRow = ({ children, className = '' }) => {
	return (
		<tr
			className={`border-b-slate-300 transition-colors hover:bg-slate-100 has-[th]:bg-indigo-50 ${className}`}
		>
			{children}
		</tr>
	)
}

const TableData = ({ elm = 'td', children, className = '' }) => {
	const baseClass =
		elm === 'td'
			? 'p-3 align-middle'
			: 'h-12 px-4 text-left align-middle font-medium text-slate-600'
	return React.createElement(
		elm,
		{ className: `${baseClass} ${className}` },
		children
	)
}

export default TableWrapper
export { Table, TableContainer, TableRow, TableData }
