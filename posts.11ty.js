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
		return this.notion(data.post.blocks);
	}
}

module.exports = Posts;
