const NotionRenderer = require("./_includes/notionRenderer");

class Notion {
	data() {
		return {
			pagination: {
				data: "posts",
				size: 1,
				alias: "post",
			},
			permalink: (data) => `/blog/${data.post.slug}/`,
			layout: "article",
		};
	}
	render(data) {
		const blockMap = data.post.blocks;
		const blockRender = NotionRenderer(blockMap);
		// there's a bug where errant commas keep appearing in the DOM
		return blockRender;
	}
}

module.exports = Notion;
