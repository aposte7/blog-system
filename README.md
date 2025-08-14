## blog-system-ui — shadcn-style copy into your app (simple guide)

This package ships a working blog UI (public pages + admin) and data hooks. You copy the source into your app (like shadcn), then import locally.

## Table of contents

-   [1) Install and copy](#1-install-and-copy)
-   [2) Minimal wiring](#2-minimal-wiring)
-   [3) Styles (Tailwind and index.css)](#3-styles-tailwind-and-indexcss)
-   [4) TypeScript note](#4-typescript-note)
-   [5) Supabase env](#5-supabase-env)
-   [6) Common imports (local)](#6-common-imports-local)
-   [7) Troubleshooting (quick)](#7-troubleshooting-quick)
-   [8) Database and storage (Supabase)](#8-database-and-storage-supabase)

## 1) Install and copy

```bash
npm install blog-system-ui
npx blogui init          # copies into src/blog_system, src/lib, src/app and public/
# fallback if npx cannot find the bin
node ./node_modules/blog-system-ui/bin/cli.mjs init
```

What gets copied

-   src/blog_system → all components and hooks
-   src/lib → utils and config
-   src/app → example routes/layouts/styles (you can merge with yours)
-   public → images/assets

## 2) Minimal wiring

Root layout with provider (imports are now local):

```tsx
// src/app/layout.tsx (or app/layout.js)
import QueryProvider from '@/blog_system/QueryProvider'
import '@/app/globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
```

Public blog pages:

```tsx
// src/app/(root)/blog/page.tsx
import BlogPostList from '@/blog_system/blog/BlogPostList'
export default function Page() {
	return <BlogPostList />
}

// src/app/(root)/blog/[blogId]/page.tsx
import BlogDetailPage from '@/blog_system/blog/BlogDetailPage'
export default function Page({ params }: { params: { blogId: string } }) {
	return <BlogDetailPage params={params} />
}
```

Admin example:

```tsx
// src/app/(dashboard)/admin/layout.tsx
import ProtectedRoute from '@/blog_system/ProtectedRoute'
import BlogLayout from '@/blog_system/blog/BlogLayout'
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute>
			<BlogLayout>{children}</BlogLayout>
		</ProtectedRoute>
	)
}
```

## 3) Styles (Tailwind and index.css)

-   New project: use the copied `src/app/globals.css` and you’re done.
-   Existing project: if your variables/utilities conflict, use the provided full theme in `index.css` from this package. Copy it into your app (e.g., `src/index.css`) and import it in your root layout:

```tsx
// src/app/layout.tsx
import '../index.css'
```

Tailwind with PostCSS users:

-   Don’t `import 'tailwindcss'` in CSS. Use the directives instead:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This package uses Tailwind v4 without PostCSS. If you do use PostCSS, keep `@tailwindcss/postcss` configured and your content paths correct.

## 4) TypeScript note

Components/hooks are `.js`/`.jsx`. In `tsconfig.json`, enable JS and include patterns so TS picks them up:

```json
{
	"compilerOptions": {
		"allowJs": true,
		"jsx": "react-jsx",
		"baseUrl": ".",
		"paths": { "@/*": ["src/*"] }
	},
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
	"exclude": ["node_modules"]
}
```

## 5) Supabase env

Create `.env.local` with your project keys:

```env
NEXT_PUBLIC_SUPABASE_URL_ENDPOINT=https://YOUR-PROJECT.supabase.co
SUPABASE_PRIVATE_KEY=YOUR_PUBLIC_OR_ANON_KEY
```

Use anon/public keys in the browser. For privileged ops, move logic to API routes.

## 6) Common imports (local)

```tsx
import { dateToString } from '@/lib/utils'
import LoginForm from '@/blog_system/LoginForm'
import { usePosts } from '@/blog_system/blog/usePosts'
```

## 7) Troubleshooting (quick)

-   Hydration issues: avoid non-deterministic code; extensions can inject attributes.
-   React Query data: always return a defined value (e.g., `data ?? []`).
-   Circular JSON in mutations: pass plain objects only (no events/DOM nodes).

---

That’s it. Copy with the CLI, import locally, and adjust styles as needed.

## 8) Database and storage (Supabase)

-   Schema is provided in `sql/` (e.g., `sql/schema.sql`). Open Supabase → SQL Editor and run it. If prompted, enable the `pgcrypto` extension for UUIDs.
-   Create your Supabase project (you can name it "blog"). The app doesn’t require a custom DB schema name; the default `public` schema is fine.
-   Create a Storage bucket named `blog-images` for post/user images.

What the SQL creates (brief)

-   profiles: author/user info (linked to `auth.users`)
-   categories and tags: taxonomy
-   posts: blog posts; FKs to profiles (author) and categories
-   post_tags: many-to-many join between posts and tags
-   comments: post comments
-   optional media tables (if present): to track uploaded assets

RLS (high level)

-   Enable RLS and add policies so the public site can read published posts and active taxonomy, while writes are limited to authenticated users or admins.
-   Storage: allow public read on `blog-images` (if desired) and authenticated writes. You can tighten this per your needs.

Environment

-   Set `.env.local` as shown above (`NEXT_PUBLIC_SUPABASE_URL_ENDPOINT`, `SUPABASE_PRIVATE_KEY` or anon key).
-   Use anon/public keys in the browser; route privileged operations through API routes.
