'use client'

import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Copy, FileText, Trash2, X } from 'lucide-react'
import Menus from '../Menu'
import InputField from '../InputField'

const quickTags = [
	'React',
	'JavaScript',
	'TypeScript',
	'Node.js',
	'CSS',
	'HTML',
	'Web Development',
	'Frontend',
	'Backend',
	'Full Stack',
	'UI/UX',
	'Design',
	'Performance',
	'Testing',
	'DevOps',
	'Mobile',
	'API',
]

function CreatePost() {
	const [md, setMd] = useState('# hello')
	const [tags, setTags] = useState([])
	const [inputTag, setInputTag] = useState('')
	const [images, setImages] = useState([])

	function addTag(e) {
		e.preventDefault()
		if (inputTag && !tags.includes(inputTag)) {
			setTags([...tags, inputTag])
			setInputTag('')
		}
	}

	function handleImageUpload(e) {
		const files = Array.from(e.target.files)
		const newImages = files.map((file) => ({
			name: file.name,
			url: URL.createObjectURL(file),
		}))
		setImages((prev) => [...prev, ...newImages])
	}

	function removeImage(name) {
		setImages(images.filter((img) => img.name !== name))
	}

	return (
		<div className="max-h-[85dvh] w-[94dvw] min-w-[27rem]  max-w-4xl overflow-y-scroll rounded-sm bg-white p-6 shadow-lg">
			<form className="space-y-4 rounded-md">
				{/* Title */}
				<div>
					<label className="mb-1 block text-sm font-medium">
						Title *
					</label>

					<InputField
						id="title"
						required={true}
						type="text"
						placeholder="Enter post title..."
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-medium">
							Author *
						</label>

						<InputField
							id="author"
							required={true}
							type="text"
							placeholder="Enter author name..."
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">
							Category *
						</label>

						<Menus>
							<Menus.Toggle id="open">
								<button className="w-full rounded-sm border border-slate-200 px-4 py-2 text-start text-slate-600">
									Select
								</button>
							</Menus.Toggle>

							<Menus.MenuViews className="" id="open">
								<Menus.Button>Saved</Menus.Button>
								<Menus.Button>Done</Menus.Button>
								<Menus.Button>Yes</Menus.Button>
							</Menus.MenuViews>
						</Menus>
					</div>
				</div>

				{/* Status & Publish Date */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-medium">
							Status *
						</label>
						<Menus>
							<Menus.Toggle id="status">
								<button className="w-full rounded-sm border border-slate-200 px-4 py-2 text-start text-slate-600">
									Drafted
								</button>
							</Menus.Toggle>
							<Menus.MenuViews id="status">
								<Menus.Button>Drafted</Menus.Button>
								<Menus.Button>Published</Menus.Button>
							</Menus.MenuViews>
						</Menus>
					</div>

					<div className="">
						<label className="mb-1 block text-sm font-medium">
							Publish Date *
						</label>

						<InputField
							defaultValue="2025-08-05"
							id="date"
							required={true}
							type="date"
							placeholder="Enter author name..."
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium">
						Tags
					</label>
					<div className="flex gap-2">
						<InputField
							id="tags"
							required={true}
							type="text"
							value={inputTag}
							placeholder="Type a tag and press Enter..."
							onChange={(e) => setInputTag(e.target.value)}
						/>
						<button
							onClick={addTag}
							className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
						>
							Add
						</button>
					</div>
					{/* Quick Tags */}
					<div className="mt-3 flex flex-wrap gap-2">
						{quickTags.map((tag) => (
							<button
								key={tag}
								type="button"
								onClick={() =>
									!tags.includes(tag) &&
									setTags([...tags, tag])
								}
								className="rounded-full border border-gray-300 px-3 py-[2px] text-xs text-gray-700 hover:bg-gray-100"
							>
								{tag}
							</button>
						))}
					</div>
					{/* Selected Tags */}
					<div className="mt-3 flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-[2px] text-sm text-indigo-700"
							>
								{tag}
								<X
									size={14}
									className="cursor-pointer"
									onClick={() =>
										setTags(tags.filter((t) => t !== tag))
									}
								/>
							</span>
						))}
					</div>
				</div>

				{/* Excerpt */}
				<div>
					<label className="mb-1 block text-sm font-medium">
						Excerpt
					</label>
					<textarea
						placeholder="Brief description of the post..."
						className="min-h-[100px] w-full resize-y rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium">
						Upload Images
					</label>
					<input
						type="file"
						multiple
						onChange={handleImageUpload}
						className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
					/>
					{/* Selected Images Preview */}
					{images.length > 0 && (
						<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{images.map((img) => (
								<div
									key={img.name}
									className="relative flex gap-2 rounded-md border p-2"
								>
									<img
										src={img.url}
										alt={img.name}
										className="h-16 w-16 rounded object-cover"
									/>
									<div className="flex-1">
										<p className="truncate text-sm font-medium">
											{img.name}
										</p>
										<div className="mt-2 flex gap-2">
											<button
												type="button"
												className="rounded p-1 hover:bg-gray-100"
											>
												<Copy size={16} />
											</button>
											<button
												type="button"
												className="rounded p-1 hover:bg-gray-100"
											>
												<FileText size={16} />
											</button>
											<button
												type="button"
												className="rounded p-1 text-red-500 hover:bg-red-100"
												onClick={() =>
													removeImage(img.name)
												}
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
					<p className="mt-2 text-xs text-gray-500">
						Select multiple images to use in your post content
						(local preview only)
					</p>
				</div>

				<div className="md:col-span-2">
					<label className="mb-1 block text-sm font-medium">
						Content * (Markdown + HTML)
					</label>
					<div className="mt-2 px-px">
						<MDEditor
							value={md}
							onChange={(value) => setMd(value)}
							height={400}
							width="100%"
							data-color-mode="light"
							hideToolbar={false}
							visibleDragbar={false}
						/>
					</div>
					<p className="text-muted-foreground mt-1 text-xs">
						Supports Markdown and HTML. Use &lt;img&gt; tags for
						precise image sizing.
					</p>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					>
						Save Post
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreatePost
