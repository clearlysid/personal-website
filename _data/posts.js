require('dotenv').config()
const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-cache-assets")

module.exports = async function () {

	async function getArticlesListFromSplitbee() {
		const blogPageId = process.env.BLOG_DB_ID
		let asset = new AssetCache('blog-list')
		if (asset.isCacheValid("1D")) {
			return asset.getCachedValue()
		}

		const response = await fetch(`https://notion-api.splitbee.io/v1/table/${blogPageId}`, {
			headers: {
				'Authorization': `Bearer ${process.env.NOTION_WEB_TOKEN}`
			}
		})

		const responseJson = response.json()
		await asset.save(responseJson, "json")
		return responseJson
	}

	async function getPageBlocksFromSplitbee(page_id) {
		let asset = new AssetCache(`splitbee-${page_id}`)

		if (asset.isCacheValid("1D")) {
			return asset.getCachedValue()
		}

		const response = fetch(`https://notion-api.splitbee.io/v1/page/${page_id}`, {
			headers: {
				'Authorization': `Bearer ${process.env.NOTION_WEB_TOKEN}`
			}
		})

		await asset.save(response, "json")
		return response
	}

	const postList = await getArticlesListFromSplitbee();

	const postPages = await Promise.all(
		postList.map((post) => {
			const date = new Date(post.date);
			const year = date.getFullYear();
			const data = getPageBlocksFromSplitbee(post.id).then((r) => ({ ...post, year, blocks: r }));
			return data;
		})
	);

	const sortedPosts = postPages.sort((postA, postB) =>
		new Date(postA.date) > new Date(postB.date) ? -1 : 1
	);

	return sortedPosts;
};
