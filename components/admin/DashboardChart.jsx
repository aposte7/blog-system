import { EnhancedChart } from './EnhancedChart'

const generateVisitorsData = () => {
	const data = []
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	for (let year = 2022; year <= 2024; year++) {
		months.forEach((month) => {
			data.push({
				month: `${month} ${year}`,
				visitors: Math.floor(Math.random() * 3000) + 1000,
			})
		})
	}
	return data
}

const generatePostsData = () => {
	const data = []
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	// Generate 3 years of data (36 data points)
	for (let year = 2022; year <= 2024; year++) {
		months.forEach((month) => {
			data.push({
				month: `${month} ${year}`,
				posts: Math.floor(Math.random() * 30) + 5,
			})
		})
	}
	return data
}

const visitorsData = generateVisitorsData()
const postsData = generatePostsData()

export function DashboardChart() {
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<EnhancedChart
				data={visitorsData}
				title="Monthly Visitors"
				dataKey="visitors"
				type="line"
			/>

			<EnhancedChart
				data={postsData}
				title="Monthly Posts"
				dataKey="posts"
				type="bar"
			/>
		</div>
	)
}
