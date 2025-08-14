#!/usr/bin/env node
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const PKG_ROOT = path.resolve(__dirname, '..')

const log = (...m) => console.log('[blogui]', ...m)
const err = (...m) => console.error('[blogui]', ...m)

const args = process.argv.slice(2)
const cmd = args[0] || 'help'
const flags = new Set(args.slice(1))

function usage() {
	console.log(`blogui - copy blog-system-ui source into your app
Usage:
  npx blog-system-ui init        # copy components, lib, and index.css
  npx blog-system-ui add comp    # copy only components
  npx blog-system-ui add lib     # copy only lib
  npx blog-system-ui add css     # copy only index.css

Flags:
  --dry      Do not write files (print actions only)
  --force    Overwrite existing files
`)
}

async function ensureDir(dir) {
	await fsp.mkdir(dir, { recursive: true })
}

async function copyDir(srcDir, destDir, overwrite = false) {
	const entries = await fsp.readdir(srcDir, { withFileTypes: true })
	await ensureDir(destDir)
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

async function copyFile(src, dest, overwrite = false) {
	const exists = fs.existsSync(dest)
	if (exists && !overwrite) {
		log('skip (exists):', path.relative(process.cwd(), dest))
		return
	}
	await ensureDir(path.dirname(dest))
	await fsp.copyFile(src, dest)
	log('copied:', path.relative(process.cwd(), dest))
}

async function copyComponents(projectRoot, overwrite) {
	const from = path.join(PKG_ROOT, 'components')
	const to = path.join(projectRoot, 'components')
	if (!fs.existsSync(from)) {
		err('source components/ not found in package')
		return
	}
	if (flags.has('--dry')) {
		return log(
			`dry copy dir: ${path.relative(
				projectRoot,
				from
			)} -> ${path.relative(projectRoot, to)}`
		)
	}
	await copyDir(from, to, overwrite)
}

async function copyLib(projectRoot, overwrite) {
	const from = path.join(PKG_ROOT, 'lib')
	const to = path.join(projectRoot, 'lib')
	if (!fs.existsSync(from)) {
		err('source lib/ not found in package')
		return
	}
	if (flags.has('--dry')) {
		return log(
			`dry copy dir: ${path.relative(
				projectRoot,
				from
			)} -> ${path.relative(projectRoot, to)}`
		)
	}
	await copyDir(from, to, overwrite)
}

async function copyCss(projectRoot, overwrite) {
	const src = path.join(PKG_ROOT, 'index.css')
	const dest = path.join(projectRoot, 'index.css') // copies alongside your app root
	if (!fs.existsSync(src)) {
		err('index.css not found in package')
		return
	}
	if (flags.has('--dry')) {
		return log(
			`dry copy file: ${path.relative(
				projectRoot,
				src
			)} -> ${path.relative(projectRoot, dest)}`
		)
	}
	await copyFile(src, dest, overwrite)
}

async function run() {
	const projectRoot = process.cwd()
	const overwrite = flags.has('--force')

	if (cmd === 'help' || args.length === 0) return usage()

	if (cmd === 'init') {
		await copyComponents(projectRoot, overwrite)
		await copyLib(projectRoot, overwrite)
		await copyCss(projectRoot, overwrite)
		log('done. import the CSS in your app root, e.g.: import "./index.css"')
		return
	}

	if (cmd === 'add') {
		const what = args[1]
		if (what === 'comp') {
			await copyComponents(projectRoot, overwrite)
			return
		}
		if (what === 'lib') {
			await copyLib(projectRoot, overwrite)
			return
		}
		if (what === 'css') {
			await copyCss(projectRoot, overwrite)
			return
		}
		err('unknown target. Use one of: comp | lib | css')
		return usage()
	}

	usage()
}

run().catch((e) => {
	err(e?.stack || e?.message || String(e))
	process.exit(1)
})
