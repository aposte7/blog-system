'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useLogin } from './useLogin'

const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	remember: z.boolean().optional(),
})

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const { loginApi, isLoading } = useLogin()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	})

	async function onFormSubmit(data) {
		try {
			loginApi({ email: data.email, password: data.password })
		} catch (err) {
			console.error('Unexpected error:', err)
			alert('An unexpected error occurred')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6">
			<div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
				{/* Header */}
				<header className="mb-4 text-center">
					<h1 className="text-2xl font-semibold text-slate-800">
						Welcome back
					</h1>
					<p className="text-sm text-slate-500">
						Sign in to your account
					</p>
				</header>

				{/* Form */}
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className="space-y-4"
					noValidate
				>
					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-slate-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							{...register('email')}
							className={`w-full rounded-lg border px-4 py-2 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
								errors.email
									? 'border-red-500 focus:ring-red-500'
									: 'border-slate-200 focus:ring-indigo-300'
							}`}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-slate-700"
							>
								Password
							</label>
							<a
								href="#"
								className="text-sm text-indigo-600 hover:underline"
							>
								Forgot?
							</a>
						</div>
						<div className="relative mt-1">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								className={`w-full rounded-lg border px-4 py-2 pr-12 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
									errors.password
										? 'border-red-500 focus:ring-red-500'
										: 'border-slate-200 focus:ring-indigo-300'
								}`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((s) => !s)}
								className="absolute inset-y-0 right-2 flex items-center px-2 text-slate-500 hover:text-slate-700"
							>
								{showPassword ? '🙈' : '👁️'}
							</button>
						</div>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex items-center justify-between">
						<label className="inline-flex items-center text-sm text-slate-700">
							<input
								type="checkbox"
								{...register('remember')}
								className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<span className="ml-2">Remember me</span>
						</label>

						<button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
