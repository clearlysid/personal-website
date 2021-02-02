module.exports = function CloudinaryRenderer(url, alt) {
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

	return picture + caption;
};
