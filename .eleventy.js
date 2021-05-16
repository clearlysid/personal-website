const NotionRenderer = require("./_includes/notion");
const CloudinaryRenderer = require("./_includes/cloudinary");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.addShortcode("notion", (blocks) => NotionRenderer(blocks));
	eleventyConfig.addShortcode("cloudimage", (url, alt) =>
		CloudinaryRenderer(url, alt)
	);

	return {
		dir: {
			output: "public",
		},
	};
};
