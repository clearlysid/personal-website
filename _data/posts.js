// const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	let postList = await Cache(
		`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`,
		{
			duration: "1d", // save for 1 day
			type: "json", // we’ll parse JSON for you
		}
	);

	let postBlocks = await Promise.all(
		postList.map((d) => {
			const postData = Cache(
				`https://notion-api.splitbee.io/v1/page/${d.id}`,
				{
					duration: "1d",
					type: "json",
				}
			).then((r) => ({ ...d, blocks: r }));
			return postData;
		})
	);

	// console.log(postBlocks);
	return postBlocks;
};
