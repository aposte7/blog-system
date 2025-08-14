import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(...inputs))
}

export function dateToString(date) {
	const dateObj = new Date(date)

	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})

	return formatter.format(dateObj).replace(',', '')
}

export function timeAgo(dateString) {
	const now = new Date()
	const created = new Date(dateString)
	const diff = now - created

	const seconds = Math.floor(diff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const months = Math.floor(days / 30)
	const years = Math.floor(days / 365)

	if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
	if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
	if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
	if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
	return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
}
