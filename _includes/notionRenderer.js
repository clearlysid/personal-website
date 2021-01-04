module.exports = function NotionRenderer(blockMap) {
	const output = BlockRenderer(0, blockMap);
	return output;
};

const getTextContent = (text) =>
	text.reduce((prev, current) => prev + current[0], ",");

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

const renderText = (el, dec) => {
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
};

const createRenderChildText = (customDecoratorComponents) => (properties) => {
	// add null check on properties
	return properties
		.map(([text, decorations], i) => {
			if (!decorations) return text;
			return decorations.reduceRight(
				(element, decorator) => renderText(element, decorator),
				text
			);
		})
		.join("");
};

function BlockRenderer(level = 0, blockMap, currentId) {
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
						BlockRenderer(level + 1, blockMap, contentId)
					)
					.join("")
			: "";

	const thisBlock = Block(level, blockMap, currentBlock, children);
	return thisBlock;
}

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

const renderImage = async (url, caption) => {
	const Image = require("@11ty/eleventy-img");

	let metadata = await Image(url, {
		formats: ["webp", "jpeg"],
		widths: [500, 1000],
		urlPath: "/images/",
		outputDir: "./public/assets/images",
	});

	let lowsrc = metadata.jpeg[0];

	// console.log(stats);
	return `<picture>
				${Object.values(metadata)
					.map((imageFormat) => {
						return `<source type="image/${
							imageFormat[0].format
						}" srcset="${imageFormat
							.map((entry) => entry.srcset)
							.join(", ")}" sizes="100vw">`;
					})
					.join("\n")}
				<img src="${lowsrc.url}" alt="${caption}">
			</picture>
			${
				caption &&
				`<figcaption class="notion-image-caption">${caption}</figcaption>`
			}`;
};

const renderAsset = async (blockValue) => {
	switch (blockValue.type) {
		case "image":
			const sourceUrl = mapImageUrl(
				blockValue.properties.source[0][0],
				blockValue
			);
			const caption = blockValue.properties.caption[0][0];
			return await renderImage(sourceUrl, caption);
		case "figma":
			return `<iframe class="notion" src="${
				blockValue.properties.source[0][0]
			}" style="height:500px;"></iframe>
						${
							blockValue.properties.caption &&
							`<figcaption class="notion-image-caption">${renderChildText(
								blockValue.properties.caption
							)}</figcaption>`
						}`;
		case "video":
			// console.log(blockValue.properties);

			// not working :(

			const url = blockValue.properties.source[0][0];
			const hackUrl = mapImageUrl(url, blockValue);

			return `<figcaption>sorry, a notion update broke the video file access</figcaption>`;

			return `<video width="640" height="480" controls>
			<source src="${hackUrl}" type="video/mp4">
		  </video>`;
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

	const renderComponent = () => {
		const renderChildText = createRenderChildText();

		switch (blockValue.type) {
			case "page":
				if (!blockValue.properties) return null;
				return `${children}`;
			case "header":
				if (!blockValue.properties) return null;
				return `<h1 class="notion>${children}</h1>`;
			case "sub_header":
				if (!blockValue.properties) return null;
				return `<h2 class="notion">${renderChildText(
					blockValue.properties.title
				)}</h2>`;
			case "sub_sub_header":
				if (!blockValue.properties) return null;
				return `<h3 class="notion">${renderChildText(
					blockValue.properties.title
				)}</h3>`;
			case "divider":
				return `<hr class="notion">`;
			case "text":
				if (!blockValue.properties) return null;
				return `<p class="notion-text">${renderChildText(
					blockValue.properties.title
				)}</p>`;
			case "bulleted_list":
			case "numbered_list":
				const wrapList = (content, start) =>
					blockValue.type === "bulleted_list"
						? `<ul className="notion">${content}</ul>`
						: `<ol start="${start}" className="notion">${content}</ol>`;

				let output = null;

				if (blockValue.content) {
					let li = "";

					if (blockValue.properties) {
						li = `<li>${renderChildText(
							blockValue.properties.title
						)}</li>`;
					}

					output = `${li}${wrapList(children)}`;
				} else {
					output = blockValue.properties
						? `<li>${renderChildText(
								blockValue.properties.title
						  )}</li>`
						: null;
				}

				const isTopLevel =
					block.value.type !==
					blockMap[block.value.parent_id].value.type;
				const start = getListNumber(blockValue.id, blockMap);
				return isTopLevel ? wrapList(output, start) : output;
			case "column_list":
				return `<div class="notion-row">${children}</div>`;
			case "column":
				const spacerWith = 24;
				const ratio = blockValue.format.column_ratio;
				const columns = Number((1 / ratio).toFixed(0));
				const spacerTotalWith = (columns - 1) * spacerWith;
				const width = `calc((100% - ${spacerTotalWith}px) * ${ratio})`;
				return `<div class="notion-column" style="width:${width};">${children}</div>
						<div class="notion-spacer" style="width:${spacerWith}px;"></div>`;
			case "quote":
				if (!blockValue.properties) return null;
				return `<blockquote class="notion">${renderChildText(
					blockValue.properties.title
				)}</blockquote>`;
			case "callout":
				if (!blockValue.properties) return null;
				return `<div class="notion-callout">${renderChildText(
					blockValue.properties.title
				)}</div>`;
			case "bookmark":
				const link = blockValue.properties.link;
				const title = blockValue.properties.title || link;
				const description = blockValue.properties.description;
				let block_color, bookmark_icon, bookmark_cover;
				if (blockValue.format) {
					block_color = blockValue.format.block_color;
					bookmark_icon = blockValue.format.bookmark_icon;
					bookmark_cover = blockValue.format.bookmark_cover;
				}

				return `
					<div class="notion-row">
						<a
							target="_blank"
							rel="noopener noreferrer"
							class="notion-bookmark${block_color && ` notion-${block_color}`}"
							href="${link[0][0]}"
						>
							<div>
								<div class="notion-bookmark-title">${renderChildText(title)}</div>
								${
									description &&
									`<div class="notion-bookmark-description">${renderChildText(
										description
									)}</div>`
								}

								<div class="notion-bookmark-link">
									${
										bookmark_icon &&
										`<img src="${bookmark_icon}" alt="${getTextContent(
											title
										)}" />`
									}
									<div>${renderChildText(link)}</div>
								</div>
							</div>
							${
								bookmark_cover &&
								`
								<div class="notion-bookmark-image">
									<img src="${bookmark_cover}" alt="${getTextContent(title)}" />
								</div>
							`
							}
						</a>
					</div>`;
			case "toggle":
				return `
					<details className="notion-toggle">
						<summary>${renderChildText(blockValue.properties.title)}</summary>
						<div>${children}</div>
					</details>`;
			case "to_do":
				let checked = false;
				if (
					blockValue &&
					blockValue.properties &&
					blockValue.properties.checked &&
					blockValue.properties.checked.toString().includes("Yes")
				) {
					checked = true;
				}

				return `<div class="notion-checkbox">
						${
							checked
								? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
								<path d="M124.95 181.05l-35.7 35.7L204 331.5l255-255-35.7-35.7L204 260.1l-79.05-79.05zM408 408H51V51h255V0H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V204h-51v204z" /></svg>`
								: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
								<path d="M408 51v357H51V51h357m0-51H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V51c0-28.05-22.95-51-51-51z" /></svg>
						`
						}
						<span>${
							blockValue.properties &&
							renderChildText(blockValue.properties.title)
						}</span>
					</div>
				`;
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
	};

	return renderComponent();
}
