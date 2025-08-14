#!/usr/bin/env node
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const PKG_ROOT = path.resolve(__dirname, '..')
const PROJECT_ROOT = process.cwd()

const log = (...m) => console.log('[blogui]', ...m)
const err = (...m) => console.error('[blogui]', ...m)

const args = process.argv.slice(2)
const cmd = args[0] || 'help'
const flags = new Set(args.slice(1))

function usage() {
	console.log(`blogui - copy blog-system-ui source into your app (shadcn-style)
Usage:
	npx blog-system-ui init        # copy components (blog_system), lib, app, and public
	npx blog-system-ui add comp    # copy blog_system (all components)
	npx blog-system-ui add blog    # copy only blog feature (blog_system/blog)
	npx blog-system-ui add lib     # copy only lib
	npx blog-system-ui add app     # copy only app (routes/css)
	npx blog-system-ui add public  # copy only public assets

Flags:
	--dry      Print actions, do not write files
	--force    Overwrite existing files
`)
}

async function ensureDir(dir) {
	await fsp.mkdir(dir, { recursive: true })
}

async function copyFile(src, dest, overwrite = false) {
	const exists = fs.existsSync(dest)
	if (exists && !overwrite) {
		log('skip (exists):', path.relative(PROJECT_ROOT, dest))
		return
	}
	await ensureDir(path.dirname(dest))
	await fsp.copyFile(src, dest)
	log('copied:', path.relative(PROJECT_ROOT, dest))
}

async function copyDir(srcDir, destDir, overwrite = false) {
	if (!fs.existsSync(srcDir)) {
		err('source not found:', path.relative(PKG_ROOT, srcDir))
		return
	}
	await ensureDir(destDir)
	const entries = await fsp.readdir(srcDir, { withFileTypes: true })
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name)
		const destPath = path.join(destDir, entry.name)
		if (entry.isDirectory()) {
			await copyDir(srcPath, destPath, overwrite)
		} else {
			await copyFile(srcPath, destPath, overwrite)
		}
	}
}

function getSrcRoot() {
	// Always copy into src; create if missing
	const srcRoot = path.join(PROJECT_ROOT, 'src')
	return srcRoot
}

// Copy entire component library folder (blog_system) into src/blog_system
async function copyComponents(overwrite) {
	const from = path.join(PKG_ROOT, 'blog_system')
	const to = path.join(getSrcRoot(), 'blog_system')
	if (flags.has('--dry')) {
		log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		)
		return
	}
	await ensureDir(getSrcRoot())
	await copyDir(from, to, overwrite)
}

// Copy only blog feature folder into src/blog_system/blog
async function copyBlog(overwrite) {
	const from = path.join(PKG_ROOT, 'blog_system', 'blog')
	const to = path.join(getSrcRoot(), 'blog_system', 'blog')
	if (flags.has('--dry')) {
		log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		)
		return
	}
	await ensureDir(path.join(getSrcRoot(), 'blog_system'))
	await copyDir(from, to, overwrite)
}

// Copy lib into src/lib
async function copyLib(overwrite) {
	const from = path.join(PKG_ROOT, 'lib')
	const to = path.join(getSrcRoot(), 'lib')
	if (flags.has('--dry')) {
		log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		)
		return
	}
	await ensureDir(getSrcRoot())
	await copyDir(from, to, overwrite)
}

// Copy app (routes and css) into src/app
async function copyApp(overwrite) {
	const from = path.join(PKG_ROOT, 'app')
	const to = path.join(getSrcRoot(), 'app')
	if (flags.has('--dry')) {
		log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		)
		return
	}
	await ensureDir(getSrcRoot())
	await copyDir(from, to, overwrite)
}

// Copy public assets to project/public (not under src)
async function copyPublic(overwrite) {
	const from = path.join(PKG_ROOT, 'public')
	const to = path.join(PROJECT_ROOT, 'public')
	if (flags.has('--dry')) {
		log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		)
		return
	}
	await copyDir(from, to, overwrite)
}

async function run() {
	if (cmd === 'help' || args.length === 0) return usage()
	const overwrite = flags.has('--force')

	// Ensure src/ exists up-front for src-based copies
	await ensureDir(getSrcRoot())

	if (cmd === 'init') {
		await copyComponents(overwrite)
		await copyLib(overwrite)
		await copyApp(overwrite)
		await copyPublic(overwrite)
		log('done. Imported into src/ (app, blog_system, lib) and public/.')
		return
	}

	if (cmd === 'add') {
		const what = args[1]
		if (what === 'comp') return copyComponents(overwrite)
		if (what === 'blog') return copyBlog(overwrite)
		if (what === 'lib') return copyLib(overwrite)
		if (what === 'app') return copyApp(overwrite)
		if (what === 'public') return copyPublic(overwrite)
		err('unknown target. Use one of: comp | blog | lib | app | public')
		return usage()
	}

	usage()
}

run().catch((e) => {
	err(e?.stack || e?.message || String(e))
	process.exit(1)
})
