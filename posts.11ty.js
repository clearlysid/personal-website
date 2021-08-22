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
				image: ({ image }) => image,
			}
		}
	}
	render(data) {
		return this.notion(data.post.blocks, false);
	}
}

module.exports = Posts;