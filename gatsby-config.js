module.exports = {
    siteMetadata: {
        title: "Siddharth Jha — UX and Interaction Designer",
        description: "Siddharth's portfolio and blog documenting his journey in the product-tech industry",
        author: 'Siddharth Jha',
        image: 'https://www.siddharth.fyi/og.jpg',
        url: 'https://www.siddharth.fyi',
        username: '@clearlysid',
    },
    plugins: [
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-168083571-2",
				head: true,
				respectDNT: true,
				pageTransitionDelay: 2000,
				defer: true,
			},
		},
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
		`gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-sass",
            options: {
                implementation: require("sass"),
                outputStyle: 'compressed',
            }
        },
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
              rootPageUrl: 'https://www.notion.so/LIVE-5456840bf1024977afa6b6f70deb8ae4',
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