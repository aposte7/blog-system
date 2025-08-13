## blog-system-ui — Using this repository as a UI library

This repo can be consumed as a component/data hooks library in your own Next.js app. It ships reusable Blog UI (cards, lists, detail page, admin screens) plus data hooks powered by React Query and Supabase.

The package name is declared in `package.json` as `blog-system-ui` and exposes:

-   `components/*` (React components and hooks)
-   `lib/*` (utilities/config)
-   `globals.css` (design tokens and Tailwind styles)
-   `index.js` (barrel that re-exports from components/lib and imports CSS)

Below is a step-by-step integration guide.

## 1) Install

Install the library and required peer dependencies in your Next.js project.

```bash
npm install blog-system-ui
```

Peer dependencies you should already have (versions compatible with this library):

-   react >= 18 (tested with 19)
-   react-dom >= 18 (tested with 19)
-   next >= 13 (tested with 15)

This library also uses the following runtime deps. If your app doesn’t already include them, install them too:

-   @tanstack/react-query and @tanstack/react-query-devtools
-   react-hook-form and @hookform/resolvers
-   zod
-   lucide-react
-   @uiw/react-md-editor
-   recharts (for admin charts)
-   sonner (for toasts)
-   tailwindcss (v4) and @tailwindcss/postcss (for styles)

Example:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools react-hook-form @hookform/resolvers zod lucide-react @uiw/react-md-editor recharts sonner
```

Tailwind v4 (if not already set up):

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

## 2) Environment variables (Supabase)

The data hooks talk to Supabase using `components/services/supabase.js` and `lib/config.js`:

-   `NEXT_PUBLIC_SUPABASE_URL_ENDPOINT`
-   `SUPABASE_PRIVATE_KEY` (see important note below)

Create a `.env.local` in your app and add:

```env
NEXT_PUBLIC_SUPABASE_URL_ENDPOINT=https://YOUR-PROJECT.supabase.co
# IMPORTANT: Never expose your service role key to the browser in production.
# Prefer a public anon key on the client, and move admin/server operations to API routes.
SUPABASE_PRIVATE_KEY=YOUR_PUBLIC_OR_ANON_KEY
```

Important security note:

-   The current `supabase.js` client is created in the browser. Do NOT use a service role key here. Use an anon/public key with Row Level Security enabled, or proxy privileged mutations through Next.js Route Handlers/API routes.

Demo-client note (v0.1.x):

-   The repository may include a demo Supabase client with hardcoded credentials. When using as a library, ensure the client reads from your env. If consuming via source, replace `components/services/supabase.js` with an env-driven client, e.g.:

```ts
// components/services/supabase.js (consumer app example)
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL_ENDPOINT
const key =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	process.env.SUPABASE_PRIVATE_KEY
if (!url || !key) throw new Error('Missing Supabase env vars')

const supabaseClient = createClient(url, key)
export default supabaseClient
```

## 3) Global styles

The library’s `index.js` includes a side-effect import of `globals.css`. To be explicit (and ensure styles load regardless of tree-shaking), also import the CSS in your app root (e.g. `app/layout.tsx` or `app/layout.js`):

```tsx
import 'blog-system-ui/globals.css'
```

Tailwind: ensure PostCSS is configured. With Tailwind v4, include the plugin in `postcss.config.mjs` and add your app content paths per Tailwind docs.

## 4) Providers (React Query and toast)

Wrap your app with the Query Provider exported by the library:

```tsx
// app/layout.tsx (or layout.js)
import QueryProvider from 'blog-system-ui/components/QueryProvider'
import 'blog-system-ui/globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
```

If you use `sonner` toasts (the library calls `toast.success(...)`), add its Toaster once at the root of your app:

```tsx
import { Toaster } from 'sonner'

// inside <body>
;<Toaster richColors />
```

## 5) Quick start — Blog pages

List page (SSR route file; the component is a Client Component internally):

```tsx
// app/blog/page.tsx (or page.jsx)
import BlogPostList from 'blog-system-ui/components/blog/BlogPostList'

export default function Page() {
	return <BlogPostList />
}
```

Detail page with dynamic route:

```tsx
// app/blog/[blogId]/page.tsx (or page.jsx)
import BlogDetailPage from 'blog-system-ui/components/blog/BlogDetailPage'

export default function Page({ params }) {
	// Pass params so the client component can read blogId
	return <BlogDetailPage params={params} />
}
```

The detail page expects your Supabase schema to return a `post` with:

-   `id, title, excerpt, content, featured_image, views, read_time, published_at`
-   `author: { name, avatar, company_role, email? }`
-   `category: { id, name }`
-   `post_tags: [{ tag: { id, name, slug } }]`
-   `comments: []` (optional)

Hooks behind the scenes:

-   `usePosts()` fetches the list of posts.
-   `usePost({ blogId })` fetches a single post by id. Ensure you pass `{ blogId }` from the dynamic route params.

## 6) Admin area (optional)

You can reuse admin components under `components/admin` and `components/Tags`/`components/categories` to build an admin dashboard. A simple protected layout can look like this:

```tsx
// app/(dashboard)/admin/layout.tsx
import ProtectedRoute from 'blog-system-ui/components/ProtectedRoute'
import BlogLayout from 'blog-system-ui/components/blog/BlogLayout'

export default function Layout({ children }) {
	return (
		<ProtectedRoute>
			<BlogLayout>{children}</BlogLayout>
		</ProtectedRoute>
	)
}
```

Implement your own auth inside `ProtectedRoute` (the library exports a placeholder). Ensure it renders `{children}` when the user is allowed.

## 7) Deep imports

You can import specific components/hooks directly:

```tsx
import BlogCard from 'blog-system-ui/components/blog/BlogCard'
import { usePosts } from 'blog-system-ui/components/blog/usePosts'
import { dateToString } from 'blog-system-ui/lib/utils'
```

## 8) Mutations cheat sheet

The library ships common mutations for posts, tags, categories, comments (using React Query mutations and `sonner` toasts). Usage pattern:

```tsx
import { useCreateTags } from 'blog-system-ui/components/Tags/useCreateTags'

export default function CreateTagForm() {
	const { createTags, isCreating } = useCreateTags()

	function onSubmit(formValues) {
		// formValues should be plain serializable data (no DOM nodes or events)
		createTags(
			{ newTag: formValues, id: null },
			{
				onSuccess: () => {
					/* reset/close */
				},
			}
		)
	}
}
```

General rules:

-   Always pass plain objects (e.g., `{ name, slug, description, color }`) to mutations.
-   Don’t pass DOM elements or event objects (avoid circular JSON errors).
-   The hooks will invalidate related queries automatically (e.g., `['tags']`).

Similar hooks exist for posts and categories under `components/blog` and `components/categories`.

## 9) Troubleshooting

-   Hydration mismatch (e.g., `cz-shortcut-listen`): caused by browser extensions or non-deterministic client code. Disable the extension or remove the attribute in a `useEffect` on mount.
-   “Query data cannot be undefined”: ensure your query function always returns a value (e.g., `return data ?? []`).
-   “Converting circular structure to JSON”: don’t pass DOM nodes or events into mutations; pass plain values (e.g., `e.target.value`).
-   “The default export is not a React Component in "/blog/[blogId]/page"”: your route file must export a default React component.
-   Tag list keys: when rendering tags, use a stable key like `postTag.tag.id`.

Additional tips:

-   Related posts: ensure your query function returns a defined value (`return data ?? []`) so React Query doesn’t throw.
-   Dynamic route params: pass `params` down to client components that need them (e.g., `<BlogDetailPage params={params} />`).
-   React Query Devtools: The library enables devtools in `QueryProvider`. That’s helpful in dev; for production, you can fork/wrap the provider to conditionally render devtools.

## 10) Scripts

This repo also works standalone as a Next.js app:

```bash
npm run dev   # start dev server
npm run build # production build
npm run start # start production server
```

## 11) Notes and caveats

-   Supabase keys in the browser must be anon/public. Route any privileged operations through server-side code.
-   Tailwind v4 is expected; if you use a different setup, copy the CSS tokens from `globals.css` or adapt your theme.
-   The library exports a lot of Client Components; wrap your app with the provided `QueryProvider` to avoid React Query context errors.

### Tailwind v4 quick config (example)

`postcss.config.mjs`:

```js
export default {
	plugins: {
		'@tailwindcss/postcss': {},
	},
}
```

Import the library CSS in your root layout and ensure your own app CSS (if any) is compatible.

---

Questions or improvements? Open an issue or PR in your fork of this repository.
