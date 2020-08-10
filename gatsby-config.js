module.exports = {
    siteMetadata: {
        title: `Siddharth Jha`,
        description: `Finally building my own portfolio`,
        author: `@clearlysid`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: 'gatsby-source-notionso',
            options: {
              name: 'Blog',
              rootPageUrl: 'https://www.notion.so/test-public-page-da0ca5fe8b5e423582c4734d104e064e',
              debug: false,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        }
    ],
}
