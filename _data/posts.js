const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	const postList = await Cache(
		`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`,
		{
			duration: "1d",
			type: "json",
		}
	);

	const postPages = await Promise.all(
		postList.map((post) => {
			const postData = Cache(
				`https://notion-api.splitbee.io/v1/page/${post.id}`,
				{
					duration: "1d",
					type: "json",
				}
			).then((r) => ({ ...post, blocks: r }));
			return postData;
		})
	);

	const sortedPosts = postPages.sort((postA, postB) =>
		new Date(postA.date) > new Date(postB.date) ? -1 : 1
	);

	return sortedPosts;
};
