import { LogOut, PanelLeft } from 'lucide-react'
import InputField from '../InputField'
import Sidebar from '../Sidebar'
import Image from 'next/image'

function BlogLayout({ children }) {
	return (
		<main className="grid h-dvh grid-cols-[18rem_1fr]">
			<Sidebar />

			<div className="overflow-y-scroll relative bg-blue-100/80">
				<div className="flex z-50 sticky top-0 justify-between border-b border-b-slate-300 bg-white px-4 py-3">
					<div className="flex items-center gap-4">
						<PanelLeft className="text-slate-500" />

						<InputField
							className="w-[20rem] min-w-[15rem]"
							type="text"
							placeholder="Search..."
						/>
					</div>

					<div className="flex gap-6">
						<div className="inline-flex items-center gap-4">
							<p>Hiikaa </p>
							<Image
								src="/600x400"
								alt="image"
								width={40}
								height={40}
								className="h-10 w-10 rounded-full bg-blue-500"
							/>
						</div>
						<div className="inline-flex items-center gap-4">
							<LogOut />
						</div>
					</div>
				</div>
				<div className="h-[91dvh]">{children}</div>
			</div>
		</main>
	)
}

export default BlogLayout
