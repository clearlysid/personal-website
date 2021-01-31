const NotionRenderer = require("./_includes/notionRenderer");

class Posts {
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
				image: ({ post }) =>
					post.image && post.image[0] ? post.image[0].url : "",
			},
		};
	}
	render(data) {
		const blockRender = eval(`\`${NotionRenderer(data.post.blocks)}\``);
		return blockRender;
	}
}

module.exports = Posts;
