'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { Copy, FileText, Trash2, X } from 'lucide-react';
import Menus from '../../components/Menu';
import { useTags } from '../tags/useTags';
import { useCategories } from '../categories/useCategories';
import useUploadImage from './useUploadImage';
import { useImages } from './useImages';
import { useCreatePost } from './useCreatePost';
import { toast } from 'sonner';

// Validation schema
const postSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	slug: z.string().min(1, 'Slug is required'),
	category: z.string().min(1, 'Category is required'),
	status: z.enum(['drafted', 'published']),
	publishDate: z.string().min(1, 'Publish date is required'),
	excerpt: z.string().optional(),
	featuredImage: z.string().url('Must be a valid URL'),
	content: z.string().min(1, 'Content is required'),
	tags: z.array(z.string()).optional(),
	read_time: z.preprocess(
		(val) => Number(val),
		z.number().int().min(3, 'Read time must be greater than 2')
	),
});

function CreatePost({ closeModal, postData }) {
	console.log('postData', postData);
	const { isLoading: isLoadingTags, tags: dbTags } = useTags();
	const { isLoading: isLoadingCategories, categories: dbCategories } =
		useCategories();
	const { uploadImage, isUploading } = useUploadImage();
	const { images } = useImages();

	const [selectedTags, setSelectedTags] = useState(
		() => postData?.post_tags.map((tg) => tg.tag) || []
	);
	const [selectedCategory, setSelectedCategory] = useState(
		() =>
			({
				id: postData?.category?.id,
				name: postData?.category?.name,
			} || [])
	);

	const { createPost: createPostMutate, isCreating } = useCreatePost();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: postData?.title || '',
			slug: postData?.slug || '',
			category: postData?.category || '',
			status: postData?.status || 'drafted',
			publishDate:
				postData?.publish_at || new Date().toISOString().split('T')[0],
			excerpt: postData?.excerpt || '',
			featuredImage: postData?.featured_image || '',
			content: postData?.content || '# hello write your blog here',
			tags: [],
			read_time: postData?.read_time || 3,
		},
	});

	const status = watch('status');

	function handleImageUpload(e) {
		const files = Array.from(e.target.files);
		if (files[0]) uploadImage(files[0]);
	}

	const onSubmit = async (data) => {
		data.tags = selectedTags.map((tag) => tag.id);
		data.media = images;

		createPostMutate(
			{ newPost: data, id: postData?.id || null },
			{
				onSuccess: (data) => {
					closeModal?.();
					reset();
				},
			}
		);
	};

	return (
		<div className="max-h-[85dvh] w-[94dvw] min-w-[27rem] max-w-4xl overflow-y-scroll rounded-sm bg-white p-6 shadow-lg">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 rounded-md"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-medium">
							Title *
						</label>
						<input
							{...register('title')}
							type="text"
							placeholder="Enter post title..."
							className="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
						{errors.title && (
							<p className="text-red-500 text-xs">
								{errors.title.message}
							</p>
						)}
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">
							Read Time *
						</label>
						<input
							{...register('read_time')}
							type="number"
							placeholder="Enter post read time..."
							className="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
						{errors.read_time && (
							<p className="text-red-500 text-xs">
								{errors.read_time.message}
							</p>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-medium">
							Slug *
						</label>
						<input
							{...register('slug')}
							type="text"
							placeholder="Enter post slug..."
							className="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
						{errors.slug && (
							<p className="text-red-500 text-xs">
								{errors.slug.message}
							</p>
						)}
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium">
							Category *
						</label>
						<Menus>
							<Menus.Toggle id="category">
								<button
									type="button"
									className="w-full rounded-sm border border-slate-200 px-4 py-2 text-start text-slate-600"
								>
									{selectedCategory?.name ||
										'Select Category'}
								</button>
							</Menus.Toggle>
							<Menus.MenuViews id="category">
								{!isLoadingCategories &&
									dbCategories.map((cat) => (
										<Menus.Button
											key={cat.id}
											onClick={(e) => {
												e.preventDefault();
												setSelectedCategory({
													name: cat.name,
													id: cat.id,
												});
												setValue('category', cat.id);
											}}
										>
											{cat.name}
										</Menus.Button>
									))}
							</Menus.MenuViews>
						</Menus>
						{errors.category && (
							<p className="text-red-500 text-xs">
								{errors.category.message}
							</p>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block text-sm font-medium">
							Status *
						</label>
						<Menus>
							<Menus.Toggle id="status">
								<button
									type="button"
									className="w-full capitalize rounded-sm border border-slate-200 px-4 py-2 text-start text-slate-600"
								>
									{status}
								</button>
							</Menus.Toggle>
							<Menus.MenuViews id="status">
								{['drafted', 'published'].map((s) => (
									<Menus.Button
										key={s}
										onClick={(e) => {
											e.preventDefault();
											setValue('status', s);
										}}
										className="capitalize"
									>
										{s}
									</Menus.Button>
								))}
							</Menus.MenuViews>
						</Menus>
						{errors.status && (
							<p className="text-red-500 text-xs">
								{errors.status.message}
							</p>
						)}
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium">
							Publish Date *
						</label>
						<input
							{...register('publishDate')}
							type="date"
							className="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
						{errors.publishDate && (
							<p className="text-red-500 text-xs">
								{errors.publishDate.message}
							</p>
						)}
					</div>
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium">
						Tags
					</label>
					<div className="mt-3 flex flex-wrap gap-2">
						{!isLoadingTags &&
							dbTags.map((tag) => (
								<button
									key={tag.id}
									type="button"
									onClick={() => {
										if (
											!selectedTags.find(
												(t) => t.id === tag.id
											)
										) {
											setSelectedTags([
												...selectedTags,
												{ name: tag.name, id: tag.id },
											]);
										}
									}}
									className="rounded-full border border-gray-300 px-3 py-[2px] text-xs text-gray-700 hover:bg-gray-100"
								>
									{tag.name}
								</button>
							))}
					</div>
					<div className="mt-3 flex flex-wrap gap-2">
						{selectedTags.map((tag) => (
							<span
								key={tag.id}
								className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-[2px] text-sm text-indigo-700"
							>
								{tag.name}
								<X
									size={14}
									className="cursor-pointer"
									onClick={() =>
										setSelectedTags(
											selectedTags.filter(
												(t) => t.id !== tag.id
											)
										)
									}
								/>
							</span>
						))}
					</div>
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium">
						Excerpt
					</label>
					<textarea
						{...register('excerpt')}
						placeholder="Brief description of the post..."
						className="min-h-[100px] w-full resize-y rounded-md border border-gray-300 px-4 py-2"
					/>
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium">
						Upload Images
					</label>
					<input
						accept="image/*"
						type="file"
						multiple
						onChange={handleImageUpload}
						className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
					/>
					{images?.length > 0 && (
						<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{images.map((img) => (
								<div
									key={img.id}
									className="relative flex gap-2 rounded-md border p-2"
								>
									<img
										src={img.image_url}
										alt={img.alt_text}
										className="h-16 w-16 rounded object-cover"
									/>
									<div className="flex-1">
										<p className="truncate w-75 text-sm font-medium">
											{img.image_url}
										</p>
										<div className="mt-2 flex gap-2">
											<button
												onClick={async () => {
													await navigator.clipboard.writeText(
														img.image_url
													);
													toast.success(
														'Image URL copied!'
													);
												}}
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
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				{/* Featured Image */}
				<div>
					<label className="mb-1 block text-sm font-medium">
						Featured Image *
					</label>
					<input
						{...register('featuredImage')}
						type="text"
						placeholder="Enter featured image URL..."
						className="w-full rounded-md border border-gray-300 px-4 py-2"
					/>
					{errors.featuredImage && (
						<p className="text-red-500 text-xs">
							{errors.featuredImage.message}
						</p>
					)}
				</div>
				{/* Markdown Content */}
				<div className="md:col-span-2">
					<label className="mb-1 block text-sm font-medium">
						Content *
					</label>
					<Controller
						name="content"
						control={control}
						render={({ field }) => (
							<MDEditor
								value={field.value}
								onChange={(value) => field.onChange(value)}
								height={400}
								data-color-mode="light"
							/>
						)}
					/>
					{errors.content && (
						<p className="text-red-500 text-xs">
							{errors.content.message}
						</p>
					)}
				</div>
				{/* Submit */}
				<div className="flex justify-end">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
					>
						Save Post
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreatePost;
