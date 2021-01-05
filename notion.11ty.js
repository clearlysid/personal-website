const NotionRenderer = require("./_includes/notionRenderer");

class Notion {
	data() {
		return {
			pagination: {
				data: "posts",
				size: 1,
				alias: "post",
			},
			permalink: ({ post }) => `/blog/${post.slug}/`,
			layout: "article",
			eleventyComputed: {
				title: ({ post }) => post.page,
				image: ({ post }) => post.image[0].rawUrl,
			},
		};
	}
	async render(data) {
		const blockMap = data.post.blocks;
		const blockRender = NotionRenderer(blockMap);
		const processed = `\`${blockRender}\``;

		// return blockRender;
		return processed;
	}
}

module.exports = Notion;
