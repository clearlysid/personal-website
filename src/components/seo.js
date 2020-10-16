import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

export default function SEO({ title, description, type, author, image, url }) {

    return <StaticQuery query={graphql`
            query SeoQuery{
                site {
                    siteMetadata {
                        title
                        description
                        author
                        image
						url
						username
                    }
                }
            }
      `}

        render={ data => {

            const metaTitle = title || data.site.siteMetadata.title
            const metaDescription = description || data.site.siteMetadata.description
            const metaType = type || 'website'
            // const metaAuthor = author || data.site.siteMetadata.author
            const metaImage = image || data.site.siteMetadata.image
            const metaUrl = url || data.site.siteMetadata.url
            const metaUsername = url || data.site.siteMetadata.username

            return <Helmet title={metaTitle}
                        meta={[
                            { name: `description`, content: metaDescription },
                            { name: `og:title`, content: metaTitle },
                            { name: `og:description`, content: metaDescription },
                            { name: `og:type`, content: metaType },
                            { name: `og:image`, content: metaImage },
                            { name: `og:url`, content: metaUrl },
                            { name: `twitter:site`, content: metaUsername },
                            { name: `twitter:card`, content: `summary` },
                            { name: `twitter:creator`, content: metaUsername },
                            { name: `twitter:title`, content: metaTitle },
                            { name: `twitter:description`, content: metaDescription },
                            { name: `twitter:image`, content: metaImage }
                        ]} />
        }}
        
    />

        }
