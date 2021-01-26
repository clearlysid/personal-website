// const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
	const playList = await Cache(
		`https://notion-api.splitbee.io/v1/table/a906ab2caf7e43289305e232d0fcfd25`,
		{
			duration: "1d", // save for 1 day
			type: "json", // we’ll parse JSON for you
		}
	);

	return playList;
};
