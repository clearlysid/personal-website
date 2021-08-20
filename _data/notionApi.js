require('dotenv').config()
const { Client } = require('@notionhq/client');
const { AssetCache } = require("@11ty/eleventy-cache-assets");
const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async function () {

	async function getArticlesListFromNotion() {
		let asset = new AssetCache("blog_list")

		if (asset.isCacheValid("1D")) {
			return asset.getCachedValue()
		}

		const response = await notion.databases.query({
			database_id: process.env.BLOG_DB_ID
		})

		// find a way to paginate over results if has_more == true
		await asset.save(response.results, "json")
		return response.results
	}

	async function getPageBlocksFromNotion(page_id) {
		let asset = new AssetCache(page_id)

		if (asset.isCacheValid("1D")) {
			return asset.getCachedValue()
		}

		const response = await notion.blocks.children.list({
			block_id: page_id
		});

		await asset.save(response.results, "json")
		return response.results
	}

	// Still using Splitbee wrapper since there is
	// no support for many block types in Notion yet.


	// let postList = await getArticlesListFromNotion()
	// const post = await Promise.all(
	// 	postList.map(post => {
	// 		const props = post.properties

	// 		const title = props.page.title[0].plain_text
	// 		const id = post.id
	// 		const date = new Date(props.date.date.start)
	// 		const year = date.getFullYear()
	// 		const image = props.image.files ? props.image.files[0] ? props.image.files[0].name : "" : ""
	// 		const published = props.published.checkbox
	// 		const slug = props.slug.rich_text[0].plain_text
	// 		const tags = props.tags.multi_select.map(t => t.name)

	// 		const data = getPageBlocksFromNotion(id).then(r => ({
	// 			title,
	// 			id,
	// 			date,
	// 			year,
	// 			image,
	// 			published,
	// 			slug,
	// 			tags,
	// 			blocks: r
	// 		}))

	// 		return data
	// 	})
	// )

	// const sortedPosts = posts.sort((postA, postB) =>
	// 	new Date(postA.date) > new Date(postB.date) ? -1 : 1
	// );

	const sortedPosts = {}

	return sortedPosts;
};
