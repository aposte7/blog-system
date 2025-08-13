import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle } from 'lucide-react'
import InputField from '../InputField'
import { cn } from '@/lib/utils'
import { useCreateComments } from './useCreateComments'

const commentSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email({ message: 'Invalid email address' }),
	content: z.string().min(1, 'Comment is required'),
})

const CommentForm = ({ className = '', params }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			name: '',
			email: '',
			content: '',
		},
	})
	const { blogId } = use(params)

	const { isCreating, createComment } = useCreateComments(params)

	const onSubmit = async (data) => {
		const payload = { ...data, post_id: blogId }

		createComment(payload, {
			onSuccess: (data) => {
				reset()
			},
		})
	}

	return (
		<div
			className={cn(
				`border-border border bg-card m-1 rounded-md px-4 py-5`,
				className
			)}
		>
			<h4 className="inline-flex mb-5 items-center gap-2 text-lg">
				<MessageCircle />
				Leave a Comment
			</h4>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="border-border space-y-4"
			>
				<div className="flex flex-wrap items-center gap-3">
					<div className="flex flex-col flex-1">
						<label className="mb-2" htmlFor="name">
							Name *
						</label>
						<InputField
							className="bg-primary/5"
							id="name"
							type="text"
							placeholder="Your name"
							{...register('name')}
						/>
						{errors.name && (
							<span className="text-red-500 text-sm">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="flex flex-col flex-1">
						<label className="mb-2" htmlFor="email">
							Email *
						</label>
						<InputField
							className="bg-primary/5"
							id="email"
							type="email"
							placeholder="Your email"
							{...register('email')}
						/>
						{errors.email && (
							<span className="text-red-500 text-sm">
								{errors.email.message}
							</span>
						)}
					</div>
				</div>

				<div className="flex flex-col">
					<label className="mb-2" htmlFor="content">
						Comment *
					</label>
					<textarea
						rows={4}
						className="w-full rounded-md border border-border px-4 py-[7px] focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none bg-primary/5"
						id="content"
						{...register('content')}
					></textarea>
					{errors.comment && (
						<span className="text-red-500 text-sm">
							{errors.comment.message}
						</span>
					)}
				</div>

				<div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="py-1.5 px-4 rounded-md bg-primary text-primary-foreground"
					>
						{isSubmitting ? 'Submitting...' : 'Comment'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default CommentForm
