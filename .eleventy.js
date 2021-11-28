const fs = require("fs")
const path = require("path")
const markdownIt = require("markdown-it")
const mdTaskCheckbox = require("markdown-it-task-checkbox")
const mdImplicitFigures = require("markdown-it-implicit-figures")
const cloudinary = require("./_includes/cloudinary")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
	// Options
	eleventyConfig.setQuietMode(true)
	eleventyConfig.setUseGitIgnore(false)
	eleventyConfig.addPassthroughCopy({ assets: "assets" })

	// Markdown Plugins
	const md = markdownIt({ html: true })
		.use(mdTaskCheckbox)
		.use(mdImplicitFigures, { figcaption: true })

	eleventyConfig.setLibrary("md", md)

	// Shortcodes
	eleventyConfig.addShortcode("cloudinary", cloudinary)

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight)

	// Vite Integration
	const entryFile = "scripts/main.js" // we could read this from vite.config.js

	const getChunkInfo = () => {
		const manifest = fs.readFileSync(path.resolve(process.cwd(), "_site", "manifest.json"))
		const parsed = JSON.parse(manifest)
		let entryChunk = parsed[entryFile]

		if (!entryChunk) throw new Error(`${entryFile} not found in the manifest.`)

		return entryChunk
	}

	eleventyConfig.addShortcode("viteScript", () => {
		return `<script type="module" src="/${getChunkInfo().file}"></script>`
	})

	eleventyConfig.addShortcode("viteStyles", () => {
		const entryChunk = getChunkInfo()
		if (!entryChunk.css || entryChunk.css.length === 0) {
			console.warn(`No css found for ${entryFile} entry`)
			return ""
		}
		return entryChunk.css
			.map((css) => `<link rel="stylesheet" href="/${css}"></link>`)
			.join("\n")
	})
}