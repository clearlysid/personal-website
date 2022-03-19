const markdownIt = require("markdown-it")
const mdTaskCheckbox = require("markdown-it-task-checkbox")
const mdImplicitFigures = require("markdown-it-implicit-figures")
const cloudinary = require("./_includes/cloudinary")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
	// Options
	eleventyConfig.setQuietMode(true)
	eleventyConfig.setUseGitIgnore(false)
	eleventyConfig.addPassthroughCopy({ "assets": "assets" })
	eleventyConfig.addPassthroughCopy({ "scripts": "assets/scripts" })
	eleventyConfig.addPassthroughCopy({ "styles": "assets/styles" })
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!--excerpt-->"
	})

	// Markdown Plugins
	const md = markdownIt({ html: true })
		.use(mdTaskCheckbox)
		.use(mdImplicitFigures, { figcaption: true })

	eleventyConfig.setLibrary("md", md)

	// Shortcodes
	eleventyConfig.addShortcode("cloudinary", cloudinary)

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight)
}