const renderHeader = (text, type) => {
	switch (type) {
		case "header":
			return `<h2 class="notion-heading-2">${text}</h2>`;
		case "sub_header":
			return `<h3 class="notion-heading-3">${text}</h3>`;
		case "sub_sub_header":
			return `<h4 class="notion-heading-4">${text}</h4>`;
	}
}

const renderList = (value, type, blockMap, text, children) => {

	// TODO: value.content and children should be rendered with <li>

	const openTag = type === "numbered_list" ? `<ol class="notion-numbered-list">` : `<ul class="notion-bulleted-list">`
	const closeTag = type === "numbered_list" ? `</ol>` : `</ul>`
	const listItemEl = `<li class="notion-list-item">${text}</li>`
	const isTopLevel =
		type !== blockMap[value.parent_id].value.type;

	const getListIndexAndLength = (blockId, blockMap) => {
		const groups = []
		let lastType = undefined
		let index = -1

		Object.keys(blockMap).forEach((id) => {
			if (blockMap[id]?.value?.content) {
				let contents = blockMap[id].value.content

				contents.forEach((blockId) => {
					const blockType = blockMap[blockId]?.value?.type;

					if (blockType !== lastType) {
						index++;
						lastType = blockType
						groups[index] = []
					}
					groups[index].push(blockId)
				});
			}
			lastType = undefined
		});

		const group = groups.find((g) => g.includes(blockId));
		if (!group) return;
		return [group.indexOf(blockId), group.length - 1];
	};

	const [index, length] = getListIndexAndLength(value.id, blockMap);

	if (index === 0) {
		return openTag + listItemEl
	} else if (index === length) {
		return listItemEl + closeTag
	} else {
		return listItemEl
	}
}

const renderQuote = (text) => `<blockquote class="notion-quote">${text}</blockquote>`

const renderCallout = (text, emoji) => {
	return `<div class="notion-callout">${emoji + " " || ""}${text}</div>`
}

const renderToggle = (text, children) => {
	// WONTFIX: current api is broken and doesn't expose children blocks
	return ""
	return `<details class="notion-toggle">
		<summary>${text}</summary>
		<div>${children}</div></details>`
}

const renderToDo = (text, checked) => `<div class="notion-checkbox${checked?.includes("Yes")
	? " checked" : ""}">${text}</div>`


module.exports = function RenderBasic(value, text, children, blockMap) {

	const type = value.type

	switch (type) {
		case "text":
			if (!text) return ""
			return `<p class="notion-text">${text}</p>`
		case "header":
		case "sub_header":
		case "sub_sub_header":
			if (!text) return ""
			return renderHeader(text, type)
		case "divider":
			return `<hr class="notion-divider">`
		case "bulleted_list":
		case "numbered_list":
			return renderList(value, type, blockMap, text, children)
		case "quote":
			return renderQuote(text)
		case "callout":
			return renderCallout(text, value.format?.page_icon)
		case "toggle":
			return renderToggle(text, children)
		case "to_do":
			return renderToDo(text, value.properties?.checked)
	}
};