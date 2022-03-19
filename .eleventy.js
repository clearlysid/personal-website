const CleanCSS = require("clean-css")
const markdownIt = require("markdown-it")
const htmlmin = require("html-minifier")
const mdTaskCheckbox = require("markdown-it-task-checkbox")
const mdImplicitFigures = require("markdown-it-implicit-figures")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
	// Options
	eleventyConfig.setQuietMode(true)
	eleventyConfig.setUseGitIgnore(false)
	eleventyConfig.addPassthroughCopy({ "assets": "assets" })
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
	eleventyConfig.addShortcode("cloudinary", (url, alt, width = 1000, className) => {
		const mobileWidth = 600 // controls breakpoint + image width
		const classN = className ? ` class="${className}"` : ``

		const baseUrl = `https://res.cloudinary.com/clearlysid/image/fetch`
		const link = (w) => baseUrl + `/f_auto/q_80/w_${w}/` + encodeURIComponent(url)

		const src = ` src="${link(width)}"`
		const altText = alt ? ` alt="${alt}"` : ``
		const sizes = ` sizes="(min-width: ${mobileWidth}px) ${width}px, ${mobileWidth}px"`
		const srcset = ` srcset="${link(width)} ${width}w, ${link(mobileWidth)}w"`

		return `<img width="${width}" height="600"` + classN + srcset + sizes + src + altText + ` />`
	})

	// Filters
	eleventyConfig.addFilter("cssmin", (code) => new CleanCSS({ level: 2 }).minify(code).styles)

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight)

	// Transforms
	eleventyConfig.addTransform("htmlmin", function (content) {

		if (this.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				continueOnParseError: true,
				minifyJS: true
			})

			// console.log(minified)
			return minified
		}

		return content
	});
}