module.exports = {
    siteMetadata: {
        title: `Siddharth Jha`,
        description: `Finally building my own portfolio`,
        author: `@clearlysid`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-source-notionso',
            options: {
              name: 'Blog',
              rootPageUrl: 'https://www.notion.so/Personal-Blog-Page-3fa9554bfd3f497696653d9cf29a898f',
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
