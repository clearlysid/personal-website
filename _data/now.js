const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	let now = await Cache(
		"https://notion-api.splitbee.io/v1/page/600e3123b9904fd2a67c25e59fb1a0db",
		{
			duration: "1d",
			type: "json",
		}
	);
	return now;
};
