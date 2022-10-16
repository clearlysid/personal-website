const esbuild = require("esbuild")
const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const markdownIt = require("markdown-it")
const mdTaskCheckbox = require("markdown-it-task-checkbox")
const mdImplicitFigures = require("markdown-it-implicit-figures")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = (config) => {

	// Markdown Plugins
	const md = markdownIt({ html: true })
		.use(mdTaskCheckbox)
		.use(mdImplicitFigures, { figcaption: true })

	config.setLibrary("md", md)

	// Shortcodes
	config.addShortcode("cloudinary", (url, alt, width = 1000, className) => {
		const mWidth = 600 // controls breakpoint + image width
		const classN = className ? ` class="${className}"` : ``
		const baseUrl = `https://res.cloudinary.com/clearlysid/image/fetch`
		const link = (w) => baseUrl + `/f_auto/q_80/w_${w}/` + encodeURIComponent(url)

		const src = ` src="${link(width)}"`
		const altText = alt ? ` alt="${alt}"` : ``
		const sizes = ` sizes="(min-width: ${mWidth}px) ${width}px, ${mWidth}px"`
		const srcset = ` srcset="${link(width)} ${width}w, ${link(mWidth)}w"`

		return `<img width="${width}" height="600"` + classN + srcset + sizes + src + altText + ` />`
	})

	// Options
	config.setQuietMode(true)
	config.setUseGitIgnore(false);
	config.addPassthroughCopy({ "assets": "assets" })
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!--excerpt-->"
	})

	// Filters, Plugins and Transforms
	config.addFilter("cssmin", (code) => new CleanCSS({ level: 2 }).minify(code).styles)
	config.addPlugin(syntaxHighlight)
	config.addTransform("htmlmin", function (content) {
		if (this.outputPath.endsWith(".html")) {
			let minifiedHtml = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				continueOnParseError: true
			})
			return minifiedHtml
		}
		return content
	});

	// Events
	config.on('eleventy.after', () => esbuild.buildSync({
		sourcemap: process.env.ELEVENTY_ENV !== "production",
		entryPoints: ["_includes/main.js"],
		outdir: "_site/assets",
		bundle: true,
		minify: true
	}))

	return {
		dir: {
			layouts: "_layouts"
		}
	}
}