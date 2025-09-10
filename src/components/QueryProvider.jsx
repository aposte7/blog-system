'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	})
}

let browserQueryClient = undefined

function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

export default function QueryProvider({ children }) {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
