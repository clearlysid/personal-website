module.exports = function RenderEmbed(blockValue, children) {
	switch (value.type) {
		case "figma":
			return `<iframe class="notion" src="${value.properties.source[0][0]
				}" style="height:500px;"></iframe>
						${value.properties.caption &&
				`<figcaption class="notion-image-caption">${renderText(
					value.properties.caption
				)}</figcaption>`
				}`;
	};