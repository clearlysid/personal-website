const markdownIt = require("markdown-it")
const mdTaskCheckbox = require("markdown-it-task-checkbox")
const mdImplicitFigures = require("markdown-it-implicit-figures")
const cloudinary = require("./_includes/cloudinary")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

const { viteScript, viteStyles } = require("./_includes/vite")

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
	eleventyConfig.addShortcode("viteScript", viteScript)
	eleventyConfig.addShortcode("viteStyles", viteStyles)
	eleventyConfig.addShortcode("cloudinary", cloudinary)

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight)
}