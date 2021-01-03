const fs = require("fs");
const path = require("path");

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
	// use shorcodes {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
	eleventyConfig.addShortcode("webpackAsset", function (name) {
		if (!manifest[name]) {
			throw new Error(
				`The asset ${name} does not exist in ${manifestPath}`
			);
		}
		return manifest[name];
	});

	// Copy all images directly to dist.
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

	// A debug utility.
	eleventyConfig.addFilter("dump", (obj) => {
		return util.inspect(obj);
	});

	// keep the console noise-free
	eleventyConfig.setQuietMode(true);

	// eleventyConfig.setLiquidOptions({
	// 	dynamicPartials: true,
	// });

	return {
		dir: {
			input: ".",
			data: "_data",
			includes: "_includes", // relative to dir.input
			layouts: "_layouts",
			output: "public",
		},
		htmlTemplateEngine: "liquid",
		passthroughFileCopy: true,
	};
};
