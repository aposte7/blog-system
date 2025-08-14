// index.d.ts
declare module 'blog-system-ui' {
	import { ComponentType } from 'react'

	// Core components
	export const ComingSoon: ComponentType<any>
	export const Empty: ComponentType<any>
	export const InputField: ComponentType<any>
	export const Loading: ComponentType<any>
	export const LoginForm: ComponentType<any>
	export const Menu: ComponentType<any>
	export const Modal: ComponentType<any>
	export const NavBar: ComponentType<any>
	export const PopupConfirm: ComponentType<any>
	export const ProtectedRoute: ComponentType<any>
	export const QueryProvider: ComponentType<any>
	export const Sidebar: ComponentType<any>
	export const Table: ComponentType<any>

	// Top-level hooks
	export function useHelpers(...args: any[]): any
	export function useLogin(...args: any[]): any
	export function useUser(...args: any[]): any

	// ========== Admin (components/admin/index.js) ==========
	export const HomePage: ComponentType<any>
	export const EnhancedChart: ComponentType<any>
	export const DashboardChart: ComponentType<any>
	export const PostList: ComponentType<any>
	export const PostPage: ComponentType<any>

	// ========== Blog (components/blog/index.js) ==========
	export const BlogCard: ComponentType<any>
	export const BlogDetailPage: ComponentType<any>
	export const BlogFeaturedList: ComponentType<any>
	export const BlogHeader: ComponentType<any>
	export const BlogHome: ComponentType<any>
	export const BlogLayout: ComponentType<any>
	export const BlogNavLink: ComponentType<any>
	export const BlogPostList: ComponentType<any>
	export const CreatePost: ComponentType<any>

	// Blog hooks
	export function useCreatePost(...args: any[]): any
	export function useDeletePost(...args: any[]): any
	export function useImages(...args: any[]): any
	export function usePost(...args: any[]): any
	export function usePosts(...args: any[]): any
	export function useRecentPosts(...args: any[]): any
	export function useRelatedPost(...args: any[]): any
	export function useUpdatePostFeatured(...args: any[]): any
	export function useUploadImage(...args: any[]): any

	// ========== Categories (components/categories/index.js) ==========
	export const CategoriesList: ComponentType<any>
	export const CategoriesPage: ComponentType<any>
	export const CreateCategory: ComponentType<any>

	// Category hooks
	export function useCategories(...args: any[]): any
	export function useCreateCategories(...args: any[]): any
	export function useDeleteCategory(...args: any[]): any

	// ========== Comment (components/comment/index.js) ==========
	export const Comment: ComponentType<any>
	export const CommentForm: ComponentType<any>
	export const CommentPage: ComponentType<any>

	// Comment hooks
	export function useComments(...args: any[]): any
	export function useCreateComments(...args: any[]): any

	// ========== Services (components/services/index.js) ==========
	// Note: services index re-exports multiple API helpers; provide loose typings for common ones.
	// Posts
	export const getPosts: any
	export const getPost: any
	export const getRecentPosts: any
	export const getRelatedPosts: any
	export const createPost: any
	export const updatePost: any
	export const deletePost: any
	export const uploadImage: any
	export const updatePostFeatured: any
	// Categories
	export const getCategoriesApi: any
	export const getCategories: any
	export const createCategory: any
	export const deleteCategory: any
	// Tags
	export const getTags: any
	export const getTagsWithPosts: any
	export const createTags: any
	export const deleteTag: any
	// Comments
	export const getComments: any
	export const createComment: any
	export const deleteComment: any
	// Auth / Helpers / Supabase
	export const login: any
	export const logout: any
	export const supabaseClient: any
	export const slugify: any

	// ========== Tags (components/Tags/index.js) ==========
	export const TagsPage: ComponentType<any>
	export const TagList: ComponentType<any>
	export const CreateTag: ComponentType<any>

	// Tag hooks
	export function useTags(...args: any[]): any
	export function useCreateTags(...args: any[]): any
	export function useDeleteTags(...args: any[]): any

	// ========== Users (components/users/index.js) ==========
	export const UsersPage: ComponentType<any>
}

// Allow deep-imports and CSS side-effect import without TS errors
declare module 'blog-system-ui/*' {
	const mod: any
	export = mod
}
declare module 'blog-system-ui/globals.css'
