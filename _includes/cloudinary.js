module.exports = function (url, alt, width = 1000, className) {

	const mobileWidth = 600 // controls breakpoint + image width
	const classN = className ? ` class="${className}"` : ``

	const baseUrl = `https://res.cloudinary.com/clearlysid/image/fetch`
	const link = (w) => baseUrl + `/f_auto/q_80/w_${w}/` + encodeURIComponent(url)

	const src = ` src="${link(width)}"`
	const altText = alt ? ` alt="${alt}"` : ``
	const sizes = ` sizes="(min-width: ${mobileWidth}px) ${width}px, ${mobileWidth}px"`
	const srcset = ` srcset="${link(width)} ${width}w, ${link(mobileWidth)}w"`

	return `<img` + classN + srcset + sizes + src + altText + ` />`
}