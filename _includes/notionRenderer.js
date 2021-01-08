module.exports = function NotionRenderer(blockMap) {
	return renderBlock(0, blockMap);
};

const groupBlockContent = (blockMap) => {
	const output = [];

	let lastType = undefined;
	let index = -1;

	Object.keys(blockMap).forEach((id) => {
		// add null checks here
		if (blockMap[id] && blockMap[id].value && blockMap[id].value.content) {
			blockMap[id].value.content.forEach((blockId) => {
				const blockType = blockMap[blockId].value.type;
				if (blockType && blockType !== lastType) {
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

const mapImageUrl = (image = "", blockV) => {
	const url = new URL(
		`https://www.notion.so${
			image.startsWith("/image")
				? image
				: `/image/${encodeURIComponent(image)}`
		}`
	);

	if (blockV && !image.includes("/images/page-cover/")) {
		const table =
			blockV.parent_table === "space" ? "block" : blockV.parent_table;
		url.searchParams.set("table", table);
		url.searchParams.set("id", blockV.id);
		url.searchParams.set("cache", "v2");
	}

	return url.toString();
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
						return `<span class="notion-${dec[1]}">${el}</span>`;
					case "c":
						return `<code class="notion">${el}</code>`;
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

const renderAsset = (blockValue) => {
	switch (blockValue.type) {
		case "image":
			const sourceUrl = mapImageUrl(
				blockValue.properties.source[0][0],
				blockValue
			);
			const caption = blockValue.properties.caption
				? blockValue.properties.caption[0][0]
				: "";

			if (sourceUrl.includes(".gif")) {
				return `<img src="${sourceUrl}" alt="${caption}" >`;
			}

			return `\${this.cloudimage("${sourceUrl}", "${caption}")}`;
		case "figma":
			return `<iframe class="notion" src="${
				blockValue.properties.source[0][0]
			}" style="height:500px;"></iframe>
						${
							blockValue.properties.caption &&
							`<figcaption class="notion-image-caption">${renderText(
								blockValue.properties.caption
							)}</figcaption>`
						}`;
		case "video":
			// console.log(blockValue.properties);
			const url = blockValue.properties.source[0][0];
			const hackUrl = mapImageUrl(url, blockValue);

			return `<figcaption>sorry, a notion update broke access to this video file</figcaption>`;
			return `<video width="640" height="480" controls><source src="${hackUrl}" type="video/mp4"></video>`;
		default:
			return ``;
	}
};

const renderCodeBlock = (content, language) => {
	const Prism = require("prismjs");

	// figure out how to render other languages
	const highlightedCode = Prism.highlight(
		content,
		Prism.languages.javascript,
		"javascript"
	);
	return `<pre><code class="${language}-code">${highlightedCode}</code></pre>`;
};

function Block(level, blockMap, block, children) {
	const blockValue = block.value;
	if (!blockValue) return "";

	const text =
		renderText(blockValue.properties && blockValue.properties.title) || "";

	switch (blockValue.type) {
		case "page":
			return `${children}`;
		case "header":
			return `<h1 class="notion>${children}</h1>`;
		case "sub_header":
			return `<h2 class="notion">${text}</h2>`;
		case "sub_sub_header":
			return `<h3 class="notion">${text}</h3>`;
		case "divider":
			return `<hr class="notion">`;
		case "text":
			return `<p class="notion-text">${text}</p>`;
		case "bulleted_list":
		case "numbered_list":
			const wrapList = (content, start) =>
				blockValue.type === "bulleted_list"
					? `<ul class="notion">${content}</ul>`
					: `<ol start="${
							start || ""
					  }" class="notion">${content}</ol>`;

			const output = blockValue.content
				? `<li>${text}</li>${wrapList(children)}`
				: `<li>${text}</li>`;

			const isTopLevel =
				block.value.type !== blockMap[block.value.parent_id].value.type;
			const start = getListNumber(blockValue.id, blockMap);
			return isTopLevel ? wrapList(output, start) : output;
		case "column_list":
			return `<div class="notion-row">${children}</div>`;
		case "column":
			const spacerWidth = 24;
			const ratio = blockValue.format.column_ratio;
			const columns = Number((1 / ratio).toFixed(0));
			const spacerTotalWidth = (columns - 1) * spacerWidth;
			const width = `calc((100% - ${spacerTotalWidth}px) * ${ratio})`;
			return `<div class="notion-column" style="width:${width};">${children}</div>
					<div class="notion-spacer" style="width:${spacerWidth}px;"></div>`;
		case "quote":
			return `<blockquote class="notion">${text}</blockquote>`;
		case "callout":
			return `<div class="notion-callout">${text}</div>`;
		case "bookmark":
			const link = blockValue.properties.link;
			const description = blockValue.properties.description;
			const icon = blockValue.format.bookmark_icon || "";
			const cover = blockValue.format.bookmark_cover || "";

			return `
				<div class="notion-row">
					<a target="_blank" class="notion-bookmark" href="${link[0][0]}">
						<div>
							<div class="notion-bookmark-title">${text}</div>
							${
								description &&
								`<div class="notion-bookmark-description">${renderText(
									description
								)}</div>`
							}
							<div class="notion-bookmark-link">
								${icon && `<img src="${icon}" alt="" />`}
								<div>${renderText(link)}</div>
							</div>
						</div>
						${
							cover &&
							`<div class="notion-bookmark-image">
								<img src="${cover}" alt="" />
							</div>`
						}
					</a>
				</div>`;
		case "toggle":
			return `
				<details className="notion-toggle">
					<summary>${text}</summary>
					<div>${children}</div>
				</details>`;
		case "to_do":
			return `<div class="notion-checkbox${
				blockValue.properties.checked &&
				blockValue.properties.checked.toString().includes("Yes")
					? " checked"
					: ""
			}">${text}</div>`;
		case "codepen":
		case "embed":
		case "figma":
		case "video":
		case "image":
			return `<figure class="notion-${blockValue.type}">${renderAsset(
				blockValue
			)}</figure>`;
		case "code":
			if (!blockValue.properties.title) return "";
			const content = blockValue.properties.title[0][0];
			const language = blockValue.properties.language[0][0] || "";
			// syntax highlighting ??
			if (language === "VB.Net")
				return `<div class="custom-code">${content}</div>`;
			return renderCodeBlock(content, language);
		default:
			return ``;
	}
}
