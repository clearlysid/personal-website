const fs = require("fs");
const path = require("path");
const NotionRenderer = require("./_includes/notion");
const CloudinaryRenderer = require("./_includes/cloudinary");

const manifestPath = path.resolve(
	__dirname,
	"public",
	"assets",
	"manifest.json"
);
const manifest = JSON.parse(
	fs.readFileSync(manifestPath, { encoding: "utf8" })
);

module.exports = function (eleventyConfig) {
	// use shortcodes {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
	eleventyConfig.addShortcode("webpackAsset", function (name) {
		if (!manifest[name]) {
			throw new Error(
				`The asset ${name} does not exist in ${manifestPath}`
			);
		}
		return manifest[name];
	});

	// cloudinary image shortcode
	eleventyConfig.addShortcode("cloudimage", (url, alt) =>
		CloudinaryRenderer(url, alt)
	);

	// Notion Renderer shortcode
	eleventyConfig.addShortcode("notion", (blocks) => NotionRenderer(blocks));

	// Copy all images directly to dist.
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

	return {
		dir: {
			input: ".",
			data: "_data",
			includes: "_includes", // relative to dir.input
			output: "public",
		},
		htmlTemplateEngine: "liquid",
		passthroughFileCopy: true,
	};
};
