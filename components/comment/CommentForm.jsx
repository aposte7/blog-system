import React from 'react'
import PropTypes from 'prop-types'
import { MessageCircle } from 'lucide-react'
import InputField from '../InputField'
import { cn } from '@/lib/utils'

const CommentForm = ({ className = '' }) => {
	return (
		<div className="border-border border bg-card m-1 rounded-md px-4 py-5">
			<h4 className="inline-flex mb-5 items-center gap-2 text-lg">
				<MessageCircle />
				Leave a Comment
			</h4>
			<form className="border-border space-y-4 bg-">
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
						/>
					</div>
					<div className="flex flex-col flex-1">
						<label className="mb-2" htmlFor="email">
							Email *
						</label>
						<InputField
							className="bg-primary/5"
							id="email"
							type="email"
							placeholder="Yor Email"
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="comment">Email *</label>
					<textarea
						rows={4}
						className="w-full rounded-md border border-border px-4 py-[7px] focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none bg-primary/5"
						name="comment"
						id="comment"
					></textarea>
				</div>

				<div>
					<button className="py-1.5 px-4 rounded-md bg-primary text-primary-foreground">
						Comment
					</button>
				</div>
			</form>
		</div>
	)
}

export default CommentForm
