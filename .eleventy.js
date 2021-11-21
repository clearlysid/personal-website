const fs = require("fs").promises;
const path = require("path");

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true)
	eleventyConfig.addPassthroughCopy({ assets: "assets" })
	eleventyConfig.addCollection("blog", (c) => c.getFilteredByGlob("blog/*.md"));

	// Read Vite's manifest.json, add script tags for entry files
	// you could probably read vite.config.js and get that information directly
	// @see https://vitejs.dev/guide/backend-integration.html

	const getChunkInformationFor = async (entryFile) => {
		// We want an entryFilename, because in practice you might have multiple entrypoints
		if (!entryFile) throw new Error("Specify an entryFile to viteScript.");

		// TODO: Consider caching this call, to avoid going to the filesystem every time
		const manifest = await fs.readFile(
			path.resolve(process.cwd(), "_site", "manifest.json")
		);

		const parsed = JSON.parse(manifest);
		let entryChunk = parsed[entryFilename];

		if (!entryChunk) throw new Error(`${entryFilename} not found in the manifest.`);

		return entryChunk;
	}

	const viteScript = async (entryFile) => {
		const entryChunk = await getChunkInformationFor(entryFile);
		return `<script type="module" src="/${entryChunk.file}"></script>`;
	};

	const viteStyles = async (entryFile) => {
		const entryChunk = await getChunkInformationFor(entryFile);
		if (!entryChunk.css || entryChunk.css.length === 0) {
			console.warn(`No css found for ${entryFile} entry`);
			return "";
		}
		/* There can be multiple CSS files per entry, so assume many by default */
		return entryChunk.css
			.map((css) => `<link rel="stylesheet" href="/${css}"></link>`)
			.join("\n");
	}

	eleventyConfig.addShortcode("viteScript", viteScript);
	eleventyConfig.addShortcode("viteStyles", viteStyles);
};
