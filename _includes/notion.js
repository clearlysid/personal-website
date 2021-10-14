const NotionRender = require('./notion/index')

module.exports = function NotionRenderer(blockMap, header) {
	return NotionRender(blockMap, header);
};

