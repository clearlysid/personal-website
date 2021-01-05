const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

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
	eleventyConfig.addShortcode("cloudimage", (url, alt) => {
		const formats = ["webp", "png"];
		const widths = [500, 1000];
		const caption = alt
			? `<figcaption class="image-caption">${alt}<figcaption>`
			: "";

		const getCloudinaryLink = (format, width, source) => {
			const cloudinary = `https://res.cloudinary.com/clearlysid/image/fetch`;
			const encSource = encodeURIComponent(source);
			const transforms = `f_${format},w_${width}`;
			return `${cloudinary}/${transforms}/${encSource}`;
		};

		const picture = `<picture>${formats
			.map(
				(f) =>
					`<source type="image/${f}" srcset="${widths
						.map((w) => `${getCloudinaryLink(f, w, url)} ${w}w,`)
						.join(
							" "
						)}" sizes="(min-width: 1000px) 1000px, (max-width: 700px) 100vw">`
			)
			.join("")}<img src="${getCloudinaryLink(
			"png",
			"500",
			url
		)}" alt="${alt}" loading="lazy"></picture>`;

		// console.log(picture);
		return picture + caption;
	});

	// Copy all images directly to dist.
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

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
