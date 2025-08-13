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

## 12) Database schema (Supabase)

This library expects a Supabase schema similar to the provided `sql/schema.sql`. It includes:

-   profiles (linked to `auth.users`) — authors
-   categories
-   tags
-   posts (FK: `author_id` → profiles, `category_id` → categories)
-   post_tags (many-to-many posts ↔ tags)
-   comments
-   media and post_media (optional, for assets)

### 12.1 Initialize schema

Run the SQL in `sql/schema.sql` inside Supabase SQL Editor. If needed, ensure the `pgcrypto` extension is enabled for `gen_random_uuid()`:

```sql
create extension if not exists pgcrypto;
```

### 12.2 Row Level Security (RLS) quickstart

Enable RLS on tables and add minimal policies so the public site can read published content while writes remain restricted. Adjust to your needs.

Public reads for published posts and active taxonomy:

```sql
alter table posts enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table comments enable row level security;

-- Read published posts
create policy "read_published_posts" on posts
for select using (status = 'published');

-- Read active categories/tags
create policy "read_active_categories" on categories
for select using (status = 'active');

create policy "read_active_tags" on tags
for select using (status = 'active');

-- Read only approved comments
create policy "read_approved_comments" on comments
for select using (status = 'approved');
```

Authenticated author/editor writes (example; adapt to your auth model):

```sql
-- Allow authenticated users to insert/update their own posts
create policy "insert_posts_auth" on posts
for insert to authenticated with check (auth.uid() = author_id);

create policy "update_posts_auth" on posts
for update to authenticated using (auth.uid() = author_id);

-- Categories/Tags writes could be limited to a role or specific users
-- Consider using Postgres roles or a custom claim to gatekeep admin areas
```

Note: For production, design policies carefully (draft visibility, moderation, etc.).

### 12.3 Query shapes expected by components

The UI uses Supabase queries that return nested relations. Ensure your selects match these shapes.

Single post by id with author, category, tags and comments:

```js
const { data: post } = await supabase
	.from('posts')
	.select(
		`
		id, title, slug, content, excerpt, featured_image, featured, read_time,
		status, views, published_at,
		author:profiles(id, name, email, company_role, avatar),
		category:categories(id, name, slug, color),
		post_tags(tag:tags(id, name, slug, color)),
		comments:comments(id, content, author_name, author_email, status, created_at)
	`
	)
	.eq('id', blogId)
	.single()
```

Posts list (homepage/blog list):

```js
const { data: posts } = await supabase
	.from('posts')
	.select(
		`
		id, title, slug, excerpt, featured_image, featured, read_time,
		status, views, published_at,
		author:profiles(id, name, avatar),
		category:categories(id, name, slug, color),
		post_tags(tag:tags(id, name, slug))
	`
	)
	.order('published_at', { ascending: false })
```

Tags with related posts (many-to-many via `post_tags`):

```js
const { data: tag } = await supabase
	.from('tags')
	.select(
		`
		id, name, slug, description, color,
		post_tags(
			post:posts(
				id, title, slug, excerpt, featured_image, status, published_at
			)
		)
	`
	)
	.eq('id', id)
	.single()
```

Related posts (example: same category, exclude current):

```js
const { data: related } = await supabase
	.from('posts')
	.select(
		'id, title, slug, excerpt, featured_image, read_time, views, published_at, category:categories(id, name)'
	)
	.eq('category_id', categoryId)
	.neq('id', currentPostId)
	.eq('status', 'published')
	.limit(6)
```

These examples rely on FKs in the schema to auto-generate PostgREST relationships (aliases like `author:profiles` use `author_id` → `profiles.id`). If your names differ, adjust the aliases accordingly.
