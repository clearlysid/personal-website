module.exports = {
    siteMetadata: {
        title: "Siddharth Jha — UX and Interaction Designer",
        description: "Siddharth's portfolio and blog documenting his journey in the product-tech industry",
        author: 'Siddharth Jha',
        keywords: ['Designer', 'Engineer', 'User Experience', 'User Interface', 'Graphic Design'],
        image: '',
        url: 'https://www.siddharth.fyi',
        twitterUsername: '@clearlysid',
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-transition-link",
            options: {
                layout: require.resolve(`./src/layouts/app.js`)
              }
         },
        {
            resolve: 'gatsby-source-notionso',
            options: {
              name: 'Blog',
              rootPageUrl: 'https://www.notion.so/test-blog-backend-da0ca5fe8b5e423582c4734d104e064e',
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