class Projects {
	data() {
		return {
			pagination: {
				data: "projects",
				size: 1,
				alias: "project",
			},
			permalink: ({ project }) => `/projects/${project.slug}/`,
			layout: "project",
			eleventyComputed: {
				title: ({ project }) => project.title,
				image: ({ project }) =>
					project.images && project.images[0]
						? project.images[0].url
						: "",
			},
		};
	}
	render(data) {
		return this.notion(data.project.blocks);
	}
}

module.exports = Projects;
