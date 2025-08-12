import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

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
