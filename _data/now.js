const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	let now = await Cache(
		"https://notion-api.splitbee.io/v1/page/43a71af018da4387a9eaa77fc537c966",
		{
			duration: "1d", // save for 1 day
			type: "json", // we’ll parse JSON for you
		}
	);
	return now;
};
