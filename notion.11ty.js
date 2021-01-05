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
				image: ({ post }) => {
					if (post.image && post.image[0]) {
						return post.image[0].url;
					} else {
						return "";
					}
				},
			},
		};
	}
	render(data) {
		const blockRender = NotionRenderer(data.post.blocks);
		const processed = eval(`\`${blockRender}\``);
		return processed;
	}
}

module.exports = Notion;
