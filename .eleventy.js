const RenderNotion = require("./_includes/notion");
const Cloudinary = require("./_includes/cloudinary");
const fs = require("fs").promises;
const path = require("path");

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.addShortcode("notion", (blocks) => RenderNotion(blocks));
	eleventyConfig.addShortcode("cloudimage", (u, a) => Cloudinary(u, a));

	// Read Vite's manifest.json, add script tags for entry files
	// you could probably read vite.config.js and get that information directly
	// @see https://vitejs.dev/guide/backend-integration.html
	eleventyConfig.addShortcode("viteScript", viteScript);
	eleventyConfig.addShortcode("viteStyles", viteStyles);

	async function viteScript(entryFilename) {
		const entryChunk = await getChunkInformationFor(entryFilename);
		return `<script type="module" src="/${entryChunk.file}"></script>`;
	}

	async function viteStyles(entryFilename) {
		const entryChunk = await getChunkInformationFor(entryFilename);
		if (!entryChunk.css || entryChunk.css.length === 0) {
			console.warn(
				`No css found for ${entryFilename} entry. Is that correct?`
			);
			return "";
		}
		/* There can be multiple CSS files per entry, so assume many by default */
		return entryChunk.css
			.map(
				(cssFile) => `<link rel="stylesheet" href="/${cssFile}"></link>`
			)
			.join("\n");
	}

	async function getChunkInformationFor(entryFilename) {
		// We want an entryFilename, because in practice you might have multiple entrypoints
		// This is similar to how you specify an entry in development more
		if (!entryFilename) {
			throw new Error(
				"You must specify an entryFilename, so that vite-script can find the correct file."
			);
		}

		// TODO: Consider caching this call, to avoid going to the filesystem every time
		const manifest = await fs.readFile(
			path.resolve(process.cwd(), "_site", "manifest.json")
		);
		const parsed = JSON.parse(manifest);

		let entryChunk = parsed[entryFilename];

		if (!entryChunk) {
			const possibleEntries = Object.values(parsed)
				.filter((chunk) => chunk.isEntry === true)
				.map((chunk) => `"${chunk.src}"`)
				.join(`, `);
			throw new Error(
				`No entry for ${entryFilename} found in _site/manifest.json. Valid entries in manifest: ${possibleEntries}`
			);
		}

		return entryChunk;
	}
};
