const RenderBasic = require('./blocks/basic')
const RenderMedia = require('./blocks/media')
const RenderEmbed = require('./blocks/embed')


module.exports = function NotionRender(blockMap) {
	return renderBlock(0, blockMap);
};

const renderText = (title) => {
	if (!title) return "";
	return title
		.map(([text, decorations]) => {
			if (!decorations) return text;
			return decorations.reduceRight((el, dec) => {
				if (!dec[0]) return "";
				switch (dec[0]) {
					case "h":
						// console.log(dec);
						if (
							dec[1].includes("pink") &&
							dec[1].includes("background")
						) {
							return `<span class="notion-redacted">${"█".repeat(
								Math.min(el.length, 10)
							)}</span>`;
						}
						return `<span class="notion-${dec[1]}">${el}</span>`;
					case "c":
						return `<code>${el}</code>`;
					case "b":
						return `<b>${el}</b>`;
					case "i":
						return `<em>${el}</em>`;
					case "s":
						return `<s>${el}</s>`;
					case "a":
						return `<a class="notion-link" href="${dec[1]}" target="_blank" rel="noreferrer">${el}</a>`;
					default:
						return el;
				}
			}, text);
		})
		.join("");
};

const renderBlock = (level = 0, blockMap, currentId) => {
	const id = currentId || Object.keys(blockMap)[0];
	const currentBlock = blockMap[id];

	if (!currentBlock) {
		console.warn("error rendering block", currentId);
		return null;
	}

	const children =
		currentBlock && currentBlock.value && currentBlock.value.content
			? currentBlock.value.content
				.map((contentId) =>
					renderBlock(level + 1, blockMap, contentId)
				)
				.join("")
			: "";

	const thisBlock = Block(level, blockMap, currentBlock, children);
	return thisBlock;
};

function Block(level, blockMap, block, children) {
	const value = block.value;
	if (!value) return "";

	const text = renderText(value.properties?.title)
	const caption = renderText(value.properties?.description)

	switch (value.type) {
		case "text":
		case "header":
		case "sub_header":
		case "sub_sub_header":
		case "divider":
		case "text":
		case "bulleted_list":
		case "numbered_list":
		case "quote":
		case "callout":
		case "toggle":
		case "to_do":
			return RenderBasic(value, text, children, blockMap)
		case "image":
		case "bookmark":
		case "video":
		case "audio":
		case "code":
		case "file":
			return RenderMedia(value, text, caption)
		case "embed":
		case "codepen":
		case "figma":
		case "tweet":
			return RenderEmbed(value)
		case "page":
			// console.dir(value.format);
			const {
				page_icon,
				page_cover,
				page_full_width,
				page_small_text,
				page_cover_position,
			} = value.format || {};

			// now we can add support for icon, cover-image and position, width, text size
			// TODO: render a self-contained page section
			return `${children}`;
		case "column_list":
			return `<div class="notion notion-row">${children}</div>`;
		case "column":
			const spacerWidth = 24;
			const ratio = value.format.column_ratio;
			const columns = Number((1 / ratio).toFixed(0));
			const spacerTotalWidth = (columns - 1) * spacerWidth;
			const width = `calc((100% - ${spacerTotalWidth}px) * ${ratio})`;
			return `<div class="notion notion-column" style="width:${width};">${children}</div>
					<div class="notion notion-spacer" style="width:${spacerWidth}px;"></div>`;


		case "codepen":
		case "embed":
		case "figma":
		default:
			return "";
	}
}
