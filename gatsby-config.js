module.exports = {
    siteMetadata: {
        title: `Siddharth Jha`,
        description: `Finally building my own portfolio`,
        author: `@clearlysid`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        }
    ],
}
