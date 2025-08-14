'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCategories } from './useCreateCategories'
import InputField from '../InputField'
import { useForm } from 'react-hook-form'

const categorySchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	slug: z.string().min(2, 'Slug must be at least 2 characters'),
	description: z.string().optional(),
	color: z.string().nonempty('Color is required'),
})

function CreateCategory({ closeModal, categoryData = {} }) {
	const { createCategories, isCreating } = useCreateCategories()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: categoryData?.name || '',
			slug: categoryData?.slug || '',
			description: categoryData?.description || '',
			color: categoryData?.color || '#8B5CF6',
		},
	})

	const onSubmit = (data) => {
		createCategories(
			{ newCategory: data, id: categoryData?.id || null },
			{
				onSuccess: () => {
					closeModal?.()
					reset()
				},
			}
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-4 px-6 w-lg pb-6 max-w-3xl bg-card">
				{/* Name */}
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Category Name
					</label>
					<InputField
						type="text"
						id="name"
						placeholder="Enter category name"
						{...register('name')}
						className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
					/>
					{errors.name && (
						<p className="text-red-500 text-xs">
							{errors.name.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="slug"
						className="block text-sm font-medium text-gray-700"
					>
						Slug
					</label>
					<InputField
						type="text"
						id="slug"
						placeholder="category-slug"
						{...register('slug')}
						className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
					/>
					{errors.slug && (
						<p className="text-red-500 text-xs">
							{errors.slug.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						id="description"
						placeholder="Category description"
						{...register('description')}
						className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
					></textarea>
					{errors.description && (
						<p className="text-red-500 text-xs">
							{errors.description.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="color"
						className="block text-sm font-medium text-gray-700"
					>
						Color
					</label>
					<InputField
						type="color"
						id="color"
						{...register('color')}
						className="mt-1 h-10 w-full cursor-pointer rounded-md border border-gray-300"
					/>
					{errors.color && (
						<p className="text-red-500 text-xs">
							{errors.color.message}
						</p>
					)}
				</div>

				{/* Buttons */}
				<div className="flex justify-end gap-2">
					<button
						type="button"
						onClick={() => closeModal()}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isCreating}
						className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						{Object.keys(categoryData).length === 0
							? 'Create'
							: 'Update'}
					</button>
				</div>
			</div>
		</form>
	)
}

export default CreateCategory
