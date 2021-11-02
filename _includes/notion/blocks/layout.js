
const renderPage = (value, text, children, showHeader) => {
	const format = value.format

	let header = ""
	let icon = format?.page_icon || ""
	let fullWidth = format?.page_full_width || false
	let smallText = format?.page_small_text || false
	let image = format?.page_cover || ""

	let titleEl = `<h1 class="notion-title">${text}</h1>`
	let imageEl = `<img src="${image}" alt="${text}">`

	if (showHeader) {
		header = `<header>${titleEl}${imageEl}</header>`
	}

	// TODO: Add icon, full width and small text features
	return `${header}${children}`
}

const renderColumnList = (children) => {
	return `<div class="notion-columns">${children}</div>`
}

const renderColumn = (value, children) => {
	// const ratio = value.format?.column_ratio
	// console.log(ratio)

	// TODO: use this ratio to size columns correctly
	return `<div class="notion-column">${children}</div>`
}

module.exports = function RenderLayout(value, text, children, showHeader) {

	const type = value.type

	switch (type) {
		case "page":
			return renderPage(value, text, children, showHeader)
		case "column_list":
			return renderColumnList(children)
		case "column":
			return renderColumn(value, children)
	}
};