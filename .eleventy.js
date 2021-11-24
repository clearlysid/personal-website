const path = require("path")
const fs = require("fs").promises

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true)
	eleventyConfig.addPassthroughCopy({ assets: "assets" })
	eleventyConfig.addCollection("notes", (c) => c.getFilteredByGlob("notes/*.md"))
	eleventyConfig.setUseGitIgnore(false)

	// Read Vite's manifest.json, add script tags for entry files
	// you could probably read vite.config.js and get that information directly
	// @see https://vitejs.dev/guide/backend-integration.html

	const getChunkInformationFor = async (entryFile) => {
		if (!entryFile) throw new Error("Specify an entry to vite")

		const manifest = await fs.readFile(path.resolve(process.cwd(), "_site", "manifest.json"))
		const parsed = JSON.parse(manifest)
		let entryChunk = parsed[entryFile]

		if (!entryChunk) throw new Error(`${entryFile} not found in the manifest.`)

		return entryChunk
	}

	const viteScript = async (entryFile) => {
		const entryChunk = await getChunkInformationFor(entryFile)
		return `<script type="module" src="/${entryChunk.file}"></script>`
	}

	const viteStyles = async (entryFile) => {
		const entryChunk = await getChunkInformationFor(entryFile)
		if (!entryChunk.css || entryChunk.css.length === 0) {
			console.warn(`No css found for ${entryFile} entry`)
			return ""
		}
		// Assume multiple CSS files per entry by default
		return entryChunk.css
			.map((css) => `<link rel="stylesheet" href="/${css}"></link>`)
			.join("\n")
	}

	eleventyConfig.addShortcode("viteScript", viteScript)
	eleventyConfig.addShortcode("viteStyles", viteStyles)
}
