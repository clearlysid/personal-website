module.exports = function RenderEmbed(value) {
	switch (value.type) {
		case "figma":
			return `<iframe class="notion" src="${value.properties.source[0][0]
				}" style="height:500px;"></iframe>}`;
	}
}