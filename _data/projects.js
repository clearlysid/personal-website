const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	const projectList = await Cache(
		`https://notion-api.splitbee.io/v1/table/5b8ff472835546eca25eb3f2c063605d`,
		{
			duration: "1d",
			type: "json",
		}
	);

	const projectPages = await Promise.all(
		projectList.map((project) => {
			const projectData = Cache(
				`https://notion-api.splitbee.io/v1/page/${project.id}`,
				{
					duration: "1d",
					type: "json",
				}
			).then((r) => ({ ...project, blocks: r }));
			return projectData;
		})
	);

	return projectPages;
};
