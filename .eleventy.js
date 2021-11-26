const cloudinary = require("./_includes/cloudinary")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

const { viteScript, viteStyles } = require("./_includes/vite")

module.exports = function (eleventyConfig) {

	// Options
	eleventyConfig.setQuietMode(true)
	eleventyConfig.setUseGitIgnore(false)
	eleventyConfig.addPassthroughCopy({ assets: "assets" })

	// Shortcodes
	eleventyConfig.addShortcode("viteScript", viteScript)
	eleventyConfig.addShortcode("viteStyles", viteStyles)
	eleventyConfig.addShortcode("cloudinary", cloudinary)

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight)
}