exports.createPages = async ({ graphql, actions, reporter }, options) => {
    const { createPage } = actions;

    const pageTemplate = require.resolve('./src/layouts/notion.js');

    const result = await graphql(
        `
        query {
          allNotionPageBlog {
            edges {
              node {
                title
                pageId
                slug
                tags
                createdAt
              }
            }
          }
        }
      `,
    );
    if (result.errors) {
        reporter.panic('error loading events', result.errors);
        return;
    }

    result.data.allNotionPageBlog.edges.forEach(({ node }) => {
        const path = `/blog/${node.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}`;
        createPage({
            path,
            component: pageTemplate,
            context: {
                pathSlug: path,
                pageId: node.pageId,
            },
        });
    });
};