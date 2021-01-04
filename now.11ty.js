const NotionRenderer = require("./_includes/notionRenderer");

class Now {
	data() {
		return {
			title: "Siddharth — What am I up to now?",
			layout: "default",
			permalink: "/now/",
		};
	}
	render(data) {
		const blockMap = data.now;
		const blockRender = NotionRenderer(blockMap);
		return `
			<div class="page-container" style="padding-bottom: max(100px, 12vh);">
				<h1 class="page-title" style="max-width: 800px;">
					Right now, Siddharth is...
				</h1>
				<main class="notion">
					${blockRender}
				</main>
			</div>
		`;
	}
}

module.exports = Now;
