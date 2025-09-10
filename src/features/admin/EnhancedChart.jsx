'use client'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Brush,
	BarChart,
	Bar,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

export function EnhancedChart({ data, title, dataKey, type }) {
	const Chart = type === 'line' ? LineChart : BarChart

	// 🎨 Custom colors
	const primaryColor = '#2563eb'
	const mutedColor = '#e2e8f0'
	const tooltipBg = '#ffffff'
	const borderColor = '#cbd5e1'

	return (
		<div className="w-full rounded-lg border border-slate-200 bg-white shadow-sm">
			{/* Card Header */}
			<div className="border-b border-slate-200 px-4 py-3">
				<h2 className="text-lg font-semibold text-slate-800">
					{title}
				</h2>
			</div>

			{/* Card Content */}
			<div className="p-4">
				<ResponsiveContainer width="100%" height={300} minHeight={250}>
					<Chart
						data={data}
						margin={{ top: 5, right: 10, left: 10, bottom: 40 }}
					>
						<XAxis
							dataKey="month"
							tick={{ fontSize: 12 }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{ fontSize: 12 }}
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: tooltipBg,
								border: `1px solid ${borderColor}`,
								borderRadius: '8px',
								fontSize: '12px',
							}}
						/>

						{type === 'line' ? (
							<Line
								type="monotone"
								dataKey={dataKey}
								stroke={primaryColor}
								strokeWidth={2}
								dot={{
									fill: primaryColor,
									strokeWidth: 2,
									r: 4,
								}}
								activeDot={{ r: 6, fill: primaryColor }}
							/>
						) : (
							<Bar
								dataKey={dataKey}
								fill={primaryColor}
								radius={[4, 4, 0, 0]}
							/>
						)}

						<Brush
							dataKey="month"
							height={30}
							stroke={primaryColor}
							fill={mutedColor}
						/>
					</Chart>
				</ResponsiveContainer>

				{/* Stats */}
				{data.length > 50 && (
					<div className="mt-4 rounded-lg bg-slate-100 p-3">
						<div className="text-xs text-slate-500">
							<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
								<div>
									Total Records:
									<span className="font-medium text-slate-800">
										{' '}
										{data.length}
									</span>
								</div>
								<div>
									Max Value:
									<span className="font-medium text-slate-800">
										{' '}
										{Math.max(
											...data.map((d) => d[dataKey] ?? 0)
										)}
									</span>
								</div>
								<div>
									Min Value:
									<span className="font-medium text-slate-800">
										{' '}
										{Math.min(
											...data.map((d) => d[dataKey] ?? 0)
										)}
									</span>
								</div>
								<div>
									Average:
									<span className="font-medium text-slate-800">
										{' '}
										{Math.round(
											data.reduce(
												(acc, d) =>
													acc + (d[dataKey] ?? 0),
												0
											) / data.length
										)}
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
