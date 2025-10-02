#!/usr/bin/env node
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, '..');
const PROJECT_ROOT = process.cwd();

const log = (...m) => console.log('[blogui]', ...m);
const err = (...m) => console.error('[blogui]', ...m);

const args = process.argv.slice(2);
const cmd = args[0] || 'help';
const flags = new Set(args.slice(1));
console.log(args, '\n', flags);

function usage() {
	console.log(`blogui - copy blog-system-ui source into your app (shadcn-style)
Usage:
	npx blog-system-ui init        # copy src/features, src/components, src/lib, src/app, public, index.css

Flags:
	--dry      Print actions, do not write files
	--force    Overwrite existing files
`);
}

async function ensureDir(dir) {
	await fsp.mkdir(dir, { recursive: true });
}

async function copyFile(src, dest, overwrite = false) {
	const exists = fs.existsSync(dest);
	if (exists && !overwrite) {
		log('skip (exists):', path.relative(PROJECT_ROOT, dest));
		return;
	}
	await ensureDir(path.dirname(dest));
	await fsp.copyFile(src, dest);
	log('copied:', path.relative(PROJECT_ROOT, dest));
}

async function copyDir(srcDir, destDir, overwrite = false) {
	if (!fs.existsSync(srcDir)) {
		err('source not found:', path.relative(PKG_ROOT, srcDir));
		return;
	}
	await ensureDir(destDir);
	const entries = await fsp.readdir(srcDir, { withFileTypes: true });
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name);
		const destPath = path.join(destDir, entry.name);
		if (entry.isDirectory()) {
			await copyDir(srcPath, destPath, overwrite);
		} else {
			await copyFile(srcPath, destPath, overwrite);
		}
	}
}

function getSrcRoot() {
	const srcRoot = path.join(PROJECT_ROOT, 'src');
	return srcRoot;
}

const SRC = {
	features: path.join(PKG_ROOT, 'src', 'features'),
	components: path.join(PKG_ROOT, 'src', 'components'),
	lib: path.join(PKG_ROOT, 'src', 'lib'),
	app: path.join(PKG_ROOT, 'src', 'app'),
	indexCss: path.join(PKG_ROOT, 'index.css'),
	public: path.join(PKG_ROOT, 'public'),
};

function has(p) {
	return fs.existsSync(p);
}

async function copyFeatures(overwrite) {
	const from = SRC.features;
	const to = path.join(getSrcRoot(), 'features');
	if (flags.has('--dry'))
		return log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await ensureDir(getSrcRoot());
	await copyDir(from, to, overwrite);
}

async function copyComponents(overwrite) {
	const from = SRC.components;
	const to = path.join(getSrcRoot(), 'components');
	if (flags.has('--dry'))
		return log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await ensureDir(getSrcRoot());
	await copyDir(from, to, overwrite);
}

async function copyLib(overwrite) {
	const from = SRC.lib;
	const to = path.join(getSrcRoot(), 'lib');
	if (flags.has('--dry'))
		return log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await ensureDir(getSrcRoot());
	await copyDir(from, to, overwrite);
}

async function copyApp(overwrite) {
	const from = SRC.app;
	const to = path.join(getSrcRoot(), 'app');
	if (flags.has('--dry'))
		return log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await ensureDir(getSrcRoot());
	await copyDir(from, to, overwrite);
}

async function copyPublic(overwrite) {
	const from = SRC.public;
	const to = path.join(PROJECT_ROOT, 'public');
	if (flags.has('--dry'))
		return log(
			`dry copy dir: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await copyDir(from, to, overwrite);
}

async function copyIndexCss(overwrite) {
	const from = SRC.indexCss;
	const to = path.join(getSrcRoot(), 'index.css');
	if (!has(from)) {
		return err('source not found:', path.relative(PKG_ROOT, from));
	}
	if (flags.has('--dry'))
		return log(
			`dry copy file: ${path.relative(
				PROJECT_ROOT,
				from
			)} -> ${path.relative(PROJECT_ROOT, to)}`
		);
	await copyFile(from, to, overwrite);
}

async function run() {
	if (cmd === 'help' || args.length === 0) return usage();
	const overwrite = flags.has('--force');

	await ensureDir(getSrcRoot());

	if (cmd === 'init') {
		// Enforce modern-only: all core dirs should exist in the package
		const missing = ['features', 'lib', 'app'].filter((k) => !has(SRC[k]));
		if (missing.length) {
			missing.forEach((k) =>
				err('source not found:', path.relative(PKG_ROOT, SRC[k]))
			);
			err(
				'The installed blog-system-ui package is missing required modern sources (src/...). Please update to the latest version.'
			);
			process.exit(1);
		}

		if (has(SRC.features)) await copyFeatures(overwrite);

		if (has(SRC.components)) await copyComponents(overwrite);
		await copyLib(overwrite);
		await copyApp(overwrite);
		if (has(SRC.public)) await copyPublic(overwrite);
		if (has(SRC.indexCss)) await copyIndexCss(overwrite);

		log(
			'done. Imported into src/ (features, components, lib, app) and public/.'
		);
		return;
	}

	usage();
}

// run().catch((e) => {
// 	err(e?.stack || e?.message || String(e));
// 	process.exit(1);
// });
