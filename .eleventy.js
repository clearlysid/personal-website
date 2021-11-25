const cloudinary = require("./_includes/cloudinary")
const { viteScript, viteStyles } = require("./_includes/vite")

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true)
	eleventyConfig.addPassthroughCopy({ assets: "assets" })
	eleventyConfig.addCollection("notes", (c) => c.getFilteredByGlob("notes/*.md"))
	eleventyConfig.setUseGitIgnore(false)

	eleventyConfig.addShortcode("viteScript", viteScript)
	eleventyConfig.addShortcode("viteStyles", viteStyles)
	eleventyConfig.addShortcode("cloudinary", cloudinary)
}