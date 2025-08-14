import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

function BlogNavLink() {
	return (
		<div className="group relative">
			<div className="flex cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-primary">
				Blog
				<ChevronDown size={16} />
			</div>

			<div className="invisible absolute -top-full left-20 z-50 mt-2 w-64 rounded-md border border-border bg-background p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 sm:top-full sm:left-0">
				<input
					type="text"
					placeholder="Search blog..."
					className="mb-3 w-full rounded-md border  border-border px-3 py-2 text-sm focus:ring-1
                                        focus:ring-offset-1 focus:ring-ring focus:outline-none"
				/>

				<ul className="space-y-2">
					<li>
						<Link
							href="/blog/categories"
							className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
						>
							Categories
						</Link>
					</li>
					<li>
						<Link
							href="/blog/recent"
							className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
						>
							Recent Articles
						</Link>
					</li>
					<li>
						<Link
							href="/blog/recent"
							className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
						>
							All Articles
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default BlogNavLink
