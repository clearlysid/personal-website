module.exports = function (url, alt, width = 800) {

	const baseUrl = `https://res.cloudinary.com/clearlysid/image/fetch`
	const altText = alt ? ` alt="${alt}" ` : ""

	const link = (w) => baseUrl + `/f_auto/w_${w}/` + encodeURIComponent(url)

	return `<img src="${link(width)}"` + altText + `/>`
}