const RenderBasic = require('./blocks/basic')
const RenderMedia = require('./blocks/media')
const RenderEmbed = require('./blocks/embed')
const RenderLayout = require('./blocks/layout')

module.exports = function NotionRender(blockMap, showHeader) {
	return InitBlock(0, blockMap, showHeader);
};

const RenderText = (title) => {
	if (!title) return ""
	return title
		.map(([text, decorations]) => {
			if (!decorations) return text
			return decorations.reduceRight((el, dec) => {
				if (!dec[0]) return ""
				switch (dec[0]) {
					case "h":
						// console.log(dec);
						if (
							dec[1].includes("pink") &&
							dec[1].includes("background")
						) {
							return `<span class="notion-redacted">${"█".repeat(
								Math.min(el.length, 10)
							)}</span>`
						}
						return `<span class="notion-${dec[1]}">${el}</span>`
					case "c":
						return `<code>${el}</code>`;
					case "b":
						return `<b>${el}</b>`
					case "i":
						return `<em>${el}</em>`
					case "s":
						return `<s>${el}</s>`
					case "a":
						return `<a class="notion-link" href="${dec[1]}" target="_blank" rel="noreferrer">${el}</a>`
					default:
						return el
				}
			}, text)
		})
		.join("")
};

const InitBlock = (level = 0, blockMap, showHeader, thisId) => {
	const id = thisId || Object.keys(blockMap)[0];
	const thisBlock = blockMap[id];

	if (!thisBlock) {
		console.warn(`block data not found: ${thisId}`);
		return ""
	}

	const children = thisBlock?.value?.content?.map((contentId) =>
		InitBlock(level + 1, blockMap, showHeader, contentId)
	).join("") || ""

	return Block(level, blockMap, thisBlock, children, showHeader)
};

const Block = (level, blockMap, block, children, showHeader) => {
	const value = block.value
	if (!value) return ""

	const type = value.type
	const text = RenderText(value.properties?.title)
	const caption = RenderText(value.properties?.description)

	switch (type) {
		case "text":
		case "header":
		case "sub_header":
		case "sub_sub_header":
		case "divider":
		case "bulleted_list":
		case "numbered_list":
		case "quote":
		case "callout":
		case "toggle":
		case "to_do":
			return RenderBasic(value, text, children, blockMap)
		case "page":
		case "column_list":
		case "column":
			return RenderLayout(value, text, children, showHeader)
		case "image":
		case "bookmark":
		case "video":
		case "audio":
		case "code":
		case "file":
			return RenderMedia(value, text, caption)
		case "embed":
		case 'tweet':
		case 'maps':
		case 'pdf':
		case 'figma':
		case 'typeform':
		case 'codepen':
		case 'excalidraw':
		case 'image':
		case 'gist':
		case 'embed':
		case 'drive':
			return RenderEmbed(value)
		default:
			console.log(`unknown block type: ${type}`)
			return ""
	}
}