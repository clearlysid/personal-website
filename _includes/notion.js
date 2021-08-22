const NotionRender = require('./notion/index')

module.exports = function NotionRenderer(blockMap) {
	return NotionRender(blockMap);
};

