const RenderBasic = require('./blocks/basic')
const RenderMedia = require('./blocks/media')
const RenderEmbed = require('./blocks/embed')
const RenderLayout = require('./blocks/layout')
const twemoji = require('twemoji')

module.exports = function NotionRender(blockMap, showHeader) {
	return InitBlock(0, blockMap, showHeader);
};

// TODO: fetch and inline twemoji images?
const RenderText = (title) => {
	if (!title) return ""
	return title
		.map(([text, decs]) => {
			if (!decs) {
				let string = twemoji.parse(text, {
					ext: '.svg',
					folder: 'svg'
				})
				return string
			}
			return decs.reduceRight((el, dec) => {
				if (!dec[0]) return ""
				let string = el
				string = twemoji.parse(el, { ext: '.svg', folder: 'svg' })
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
						return `<span class="notion-${dec[1]}">${string}</span>`
					case "c":
						return `<code>${string}</code>`;
					case "b":
						return `<b>${string}</b>`
					case "i":
						return `<em>${string}</em>`
					case "s":
						return `<s>${string}</s>`
					case "a":
						return `<a class="notion-link" href="${dec[1]}" target="_blank" rel="noreferrer">${string}</a>`
					default:
						return string
				}
			}, text)
		})
		.join("")
};

const InitBlock = (level = 0, blockMap, showHeader, thisId) => {
	const id = thisId || Object.keys(blockMap)[0];
	const thisBlock = blockMap[id];

	if (!thisBlock) {
		console.warn(`block not found: ${thisId}`);
		return ""
	}

	const children = thisBlock?.value?.content?.map((childId) =>
		InitBlock(level + 1, blockMap, showHeader, childId)
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
			console.warn(`unknown block type: ${type}`)
			return ""
	}
}