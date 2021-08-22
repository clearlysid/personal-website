const renderHeader = (text, type) => {
	switch (type) {
		case "header":
			return `<h2 class="notion-header-1">${text}</h2>`;
		case "sub_header":
			return `<h3 class="notion-header-2">${text}</h3>`;
		case "sub_sub_header":
			return `<h4 class="notion-header-3">${text}</h4>`;
	}
}

const renderList = (value, type, blockMap, text, children) => {
	const groupBlockContent = (blockMap) => {
		const output = [];

		let lastType = undefined;
		let index = -1;

		Object.keys(blockMap).forEach((id) => {
			if (blockMap[id]?.value?.content) {
				let contents = blockMap[id].value.content

				contents.forEach((blockId) => {
					const blockType = blockMap[blockId]?.value?.type;

					if (blockType !== lastType) {
						index++;
						lastType = blockType;
						output[index] = [];
					}
					output[index].push(blockId);
				});
			}
			lastType = undefined;
		});

		return output;
	};

	const getListNumber = (blockId, blockMap) => {
		const groups = groupBlockContent(blockMap);
		const group = groups.find((g) => g.includes(blockId));
		if (!group) return;
		return group.indexOf(blockId) + 1;
	};

	const wrapList = (content, start) =>
		type === "bulleted_list"
			? `<ul class="notion-bulleted-list">${content}</ul>`
			: `<ol start="${start || ""
			}" class="notion-numbered-list">${content}</ol>`;

	const output = value.content
		? `<li>${text}</li>${wrapList(children)}`
		: `<li>${text}</li>`;

	const isTopLevel =
		type !== blockMap[value.parent_id].value.type;
	const start = getListNumber(value.id, blockMap);
	return isTopLevel ? wrapList(output, start) : output;
}

const renderQuote = (text) => {
	return `<blockquote class="notion-quote">${text}</blockquote>`
}

const renderCallout = (text, emoji) => {
	return `<div class="notion-callout">${emoji || ""}${text}</div>`
}

const renderToggle = (text, children) => {
	return `<details class="notion-toggle">
		<summary>${text}</summary>
		<div>${children}</div></details>`
}

const renderToDo = (text, checked) => {
	return `<div class="notion-checkbox${checked?.includes("Yes")
		? " checked" : ""}">${text}</div>`;
}


module.exports = function RenderBasic(value, text, children, blockMap) {

	const type = value.type

	switch (type) {
		case "text":
			if (!text) return "";
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
			// TODO: fix list semantics
			return renderList(value, type, blockMap, text, children)
		case "quote":
			return renderQuote(text)
		case "callout":
			// TODO: add emoji, background color
			return renderCallout(text, value.format?.page_icon)
		case "toggle":
			console.log(children)
			return renderToggle(text, children)
		case "to_do":
			return renderToDo(text, value.properties?.checked)
		default:
			console.log(`can't render type: ${type}`)
	}
};