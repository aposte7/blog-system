# blog-system-ui

Shadcn-style copyable blog system (public blog + admin) for Next.js 13+ (App Router). You install the package, run one CLI command, and the full source (features, components, routes, styles, Supabase hooks) is copied into your own `src/` so you fully own and customize it.

> Single command workflow: `npx blog-system-ui init`

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Quick Start](#quick-start)
4. [Installation & Copy](#installation--copy)
5. [Directory Structure](#directory-structure)
6. [Environment Variables](#environment-variables)
7. [TypeScript Setup](#typescript-setup)
8. [Styling & Tailwind](#styling--tailwind)
9. [Supabase Setup](#supabase-setup)
10. [Using the CLI](#using-the-cli)
11. [Customization Tips](#customization-tips)
12. [Updating the Package](#updating-the-package)
13. [Troubleshooting](#troubleshooting)
14. [FAQ](#faq)
15. [License](#license)

---

## Overview

Traditional component packages lock you into a black-box `node_modules` API. This package instead ships raw source code (like _shadcn/ui_): copy once, own forever. After running the CLI you can refactor, delete, rename, theme, or gradually merge pieces into an existing codebase.

Core ideas:

-   **Modern-only layout** – Everything lives under `src/` in the package (no legacy fallback).
-   **No runtime coupling** – You can uninstall the package after copying; your app keeps working.
-   **Supabase-ready** – Hooks and service files assume a Supabase project with the provided schema.
-   **Composable features** – Blog, posts, tags, categories, comments, admin dashboard, auth scaffolding.

## Features

-   **Public Blog UI**: Post list, featured list, detail page, related & recent logic, navigation, layout.
-   **Admin Dashboard**: Post CRUD (create, delete, mark featured, image upload), categories, tags, comment hooks (with placeholder pages), simple metrics charts, user placeholders.
-   **Authentication Scaffolding**: `LoginForm`, `ProtectedRoute`, login hooks (you wire actual auth/redirect logic).
-   **Data Layer (Supabase + TanStack Query)**: Hooks for posts, single post, related, recent, tags, categories, comments; mutation hooks with optimistic refresh patterns where appropriate.
-   **Form Handling**: `react-hook-form` + `zod` patterns you can extend.
-   **UI Building Blocks**: Modal, Table, Sidebar, Menus, PopupConfirm, InputField, Loading, Empty, ComingSoon, layout components.
-   **Image Support**: Remote pattern pre-configured for Supabase Storage bucket `blog-images`.
-   **Styling**: Tailwind v4 tokens + utilities in `index.css` (or `src/app/index.css`), merge-friendly theme approach.
-   **Developer Experience**: Single `init` command, clear separation between features and components.

## Quick Start

```bash
npm install blog-system-ui
npx blog-system-ui init
# start your dev server
npm run dev
```

Open `src/app/(root)/blog` and `/admin` pages in your browser.

## Installation & Copy

1. Install the package (`npm install blog-system-ui`).
2. Run `npx blog-system-ui init` (or `node node_modules/blog-system-ui/bin/cli.mjs init` if npx cannot resolve).
3. The CLI copies:
    - `src/features/*`
    - `src/components/*`
    - `src/lib/*`
    - `src/app/*` (example routes/layouts/styles)
    - `public/*` (images)
    - `index.css` → `src/index.css` if present (or keep using `src/app/index.css` depending on version)
4. Import Query Provider in your root layout and you're ready.

After copying you may uninstall the package if desired.

## Directory Structure

After `init` you will have (simplified):

```
src/
	app/
		(auth)/login/page.jsx
		(root)/layout.jsx
		(root)/blog/page.jsx
		(root)/blog/[blogId]/page.jsx
		(dashboard)/admin/... (posts, categories, tags, comments, users)
		layout.jsx (root html/body + QueryProvider)
		index.css (theme + tailwind directives if shipped)
	components/
		NavBar.jsx, Modal.jsx, Table.jsx, etc.
	features/
		blog/ (BlogPostList, BlogDetailPage, hooks...)
		admin/ (HomePage, charts, posts list...)
		categories/
		tags/
		comment/
		services/ (Supabase APIs, authApi, postApi, etc.)
		users/
	lib/
		config.js, utils.js
	index.css (optional root theme if provided separately)
public/
	600x400.svg
	admin-hero.jpg
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL_ENDPOINT=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Optional (server-only privileged ops):

```
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY   # NEVER expose to client code
```

## TypeScript Setup

If you use TS but the copied files are `.js`/`.jsx`, enable JS:

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

> NOTE: The `include` array MUST list both `**/*.js` and `**/*.jsx` (alongside `*.ts` / `*.tsx`) or TypeScript will ignore the copied JavaScript source and you will see unresolved import / missing declaration errors. Setting `allowJs: true` alone is not enough—files still have to match the `include` globs.

Update imports to use the alias, e.g. `import BlogPostList from '@/features/blog/BlogPostList'`.

## Styling & Tailwind

Two approaches:

1. **Keep Provided Styles** – Use the copied `src/app/index.css` (or `src/index.css`). Import it in `src/app/layout.jsx`.
2. **Merge Into Existing** – Copy the design tokens and `@tailwind` directives into your existing global CSS.

Tailwind (with PostCSS) base content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Avoid `import 'tailwindcss'` in CSS when using PostCSS.

## Supabase Setup

1. Create a Supabase project (you can name it `blog`).
2. Create a Storage bucket named `blog-images`.
3. Run the schema from the repo's `sql/` folder (enable `pgcrypto` if required for UUIDs).
4. Set RLS policies to allow public reads for published posts & active taxonomy; restrict writes to authenticated users or roles.
5. Use the anon key on the client; service role key only in server code (API routes, server actions, or route handlers).

**Supabase Client Separation (recommended):**

-   `supabaseClient` (public) uses `NEXT_PUBLIC_SUPABASE_*` vars.
-   `supabaseAdmin` (server) uses `SUPABASE_SERVICE_ROLE_KEY` (never imported in client components).

## Using the CLI

Command:

```bash
npx blog-system-ui init
```

Flags:

-   `--dry` Show what would copy without writing.
-   `--force` Overwrite existing files.

Example dry run:

```bash
npx blog-system-ui init --dry
```

## Customization Tips

-   **Rename Folders**: e.g. move `features/blog` to `modules/blog`; update imports with a project-wide search.
-   **Swap Auth**: Replace `LoginForm` and `ProtectedRoute` with your own provider (Clerk/Auth.js/etc.).
-   **Change Theme**: Edit `index.css` – update color variables, spacing scale, or typography.
-   **Disable Features**: Delete entire feature folders (e.g., `comment/`) and remove linked routes.
-   **APIs**: Point service files (`postApi`, `categoriesApi`, etc.) to your own backend instead of Supabase.

## Updating the Package

Since you own a local copy, updates are manual. To see what changed in a new release:

1. Install the new version in a temporary folder.
2. Run `npx blog-system-ui init --dry` to see structure.
3. Diff the new `src/features/...` against your local modifications and cherry-pick changes.

## Troubleshooting

| Problem                       | Cause                            | Fix                                                                 |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `supabaseKey is required`     | Missing env vars                 | Verify `.env.local` names & restart dev server                      |
| 404 on `/`                    | No `app/page.jsx`                | Create a root page or redirect from `/`                             |
| Tailwind classes not applied  | CSS not imported                 | Import `index.css` or your merged global file in root layout        |
| Images blocked                | Missing remote pattern           | Ensure `next.config.mjs` sets Supabase storage hostname             |
| CLI copies nothing            | Package installed without `src/` | Reinstall latest; confirm `npm pack --dry-run` lists `src/features` |
| Alias resolves to `@/src/...` | Wrong paths config               | Set `paths: { "@/*": ["src/*"] }`                                   |

## FAQ

**Can I remove the package after copying?** Yes—after `init` all code is local.

**Does this include database migrations?** A schema SQL file is provided; apply it manually in Supabase.

**Why a single CLI command?** Simplicity. You can fork & extend if you prefer granular copy commands.

**Will you publish React Server Components?** Client components dominate here due to React Query/stateful interactions. You can refactor pieces to server components if needed.

**Is there TypeScript support?** Source is JS; enable `allowJs` or progressively migrate files to `.ts/.tsx`.

## License

MIT. Use freely; attribution appreciated but not required.

---

Happy building! If you add cool extensions (theme packs, adapter for another backend, etc.), consider sharing them.
