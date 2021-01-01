import Head from "next/head"

export default function SEO({
    title = "Siddharth Jha — UX and Interaction Designer",
    description = "Siddharth's portfolio and blog documenting his journey in the product-tech industry",
    type = "website",
    image = "https://www.sidds.me/og.jpg",
    url = "https://www.sidds.me",
    username = "@clearlysid",
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Siddharth Jha" />

            <meta name="twitter:card" value="summary" />
            <meta name="twitter:site" content={username} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content={username} />
            <meta name="twitter:image" content={image} />
        </Head>
    )
}
