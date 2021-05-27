const RenderNotion = require("./_includes/notion");
const Cloudinary = require("./_includes/cloudinary");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.addShortcode("notion", (blocks) => RenderNotion(blocks));
	eleventyConfig.addShortcode("cloudimage", (u, a) => Cloudinary(u, a));
};
