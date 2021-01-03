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
		return blockRender;
	}
}

module.exports = Notion;
