const cloudinaryRenderer = require("./../../cloudinary")

const mapImageUrl = (image = "", value) => {
	const url = new URL(
		`https://www.notion.so${image.startsWith("/image")
			? image
			: `/image/${encodeURIComponent(image)}`
		}`
	)

	if (value && !image.includes("/images/page-cover/")) {
		const table =
			value.parent_table === "space" ? "block" : value.parent_table
		url.searchParams.set("table", table)
		url.searchParams.set("id", value.id)
		url.searchParams.set("cache", "v2")
	}

	return url.toString()
};

const renderCodeBlock = (content, language) => {
	const Prism = require("prismjs")

	// Only supported languages: markup, css, clike and js
	// TODO: map notion languages to prism defaults

	const hlCode = Prism.highlight(
		content,
		Prism.languages.javascript,
		"javascript"
	);
	return `<pre><code class="language-${language}">${hlCode}</code></pre>`
};


const renderBookmark = (value, text, caption) => {
	const link = value.properties?.link[0][0]
	const icon = value.format?.bookmark_icon
	const cover = value.format?.bookmark_cover

	return `
		<a class="notion-bookmark" href="${link}" target="_blank">
			<div class="bm-title">${text}</div>
			${caption && `<div class="bm-caption">${caption}</div>`}
			${icon && `<img class="bm-image" src="${icon}" />`}
			${cover && `<img class="bm-image" src="${cover}"/>`}
		</a>`
}

const renderImage = (value, caption) => {

	// TODO: check if dimensions can be interpolated from notion
	const sourceUrl = mapImageUrl(
		value.properties.source[0][0],
		value
	);
	let captionText = ""

	if (value.properties?.caption && value.properties.caption[0]) {
		captionText = value.properties.caption[0][0]
	}

	let captionEl = ""

	if (caption) {
		captionEl = `<figcaption>${caption}</figcaption>`
	}

	if (sourceUrl.includes(".gif")) {
		return `<figure class="notion-image><img src="${sourceUrl}" alt="${captionText}">${captionEl}</figure>`
	}

	return cloudinaryRenderer(sourceUrl, caption)
}

const renderVideo = (value, caption) => {
	// TODO: generate iframe embed for youtube / video
	// Clooudinary video for everything else
	let captionEl = ""
	if (caption) {
		captionEl = `<figcaption>${caption}</figcaption>`
	}

	// Find a way to access video on AWS without credentials
	const url = value.properties.source[0][0]
	// const hackUrl = mapImageUrl(url, value)
	// console.log(url)

	return `<figcaption>sorry, a notion update broke access to this video file</figcaption>`
	return `<video width="640" height="480" controls><source src="${hackUrl}" type="video/mp4"></video>`
}

module.exports = function RenderMedia(value, text, caption) {

	const type = value.type

	// TODO: Add file and audio support
	switch (type) {
		case "bookmark":
			return renderBookmark(value, text, caption)
		case "video":
			return renderVideo(value, caption)
		case "image":
			return renderImage(value, caption)
		case "code":
			if (!value.properties?.title) return ""
			const content = value.properties?.title[0][0]
			const language = value.properties?.language[0][0] || ""
			if (language === "VB.Net")
				return `<div class="notion-custom">${content}</div>`
			return renderCodeBlock(content, language)
	}
};