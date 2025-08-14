import Link from 'next/link'

function ComingSoon() {
	return (
		<div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4">
			<h1 className="text-6xl font-extrabold mb-4 animate-pulse">
				🚀 Coming Soon
			</h1>
			<p className="text-lg mb-8 text-center max-w-md">
				This Page is under construction. : |
			</p>
			<div className="flex gap-4">
				<Link
					href="/admin"
					className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition"
				>
					Go Back
				</Link>
			</div>
		</div>
	)
}

export default ComingSoon
