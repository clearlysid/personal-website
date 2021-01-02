import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { format } from "date-fns"
import SEO from "@components/seo"
import styled from "styled-components"
import { PageTitle, PageFooter, PageContainer } from "@components/page"

export async function getStaticProps() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`
    ).then(res => res.json())

    // get all tags and make array of unique ones
    let alltags = []
    data.map(post => post.tags).map(tags => tags.map(tag => alltags.push(tag)))
    const uniqueTags = [...new Set(alltags)]

    // filter out unpublished posts
    if (process.env.NODE_ENV !== "development") {
        data = data.filter(x => x.published)
    }

    return { props: { posts: data, tags: uniqueTags } }
}

const PostDate = styled.div`
    font-size: 14px;
    line-height: 1.8em;
    font-family: "Inconsolata", monospace;
`

const PostTitle = styled.h4`
    margin-top: 0;
    font-family: "hk_grotesk", sans-serif;
    font-weight: 400;
`

const PostList = styled.ul`
    padding: 2rem 0;
    grid-column: 1;
    border-top: 2px solid #eeeeee;
    width: 100%;

    & > li {
        list-style: none;
        margin: 0;
        padding-bottom: 1em;
        position: relative;
        transition: transform 0.2s ease;

        & > a {
            display: grid;
            grid-template-columns: min-content auto;
            column-gap: 20px;
            border: none;
            align-items: flex-start;
        }
    }

    @media (min-width: 700px) {
        & > li:hover {
            transform: translateX(10px);
        }
    }
`

const BlogTags = styled.div`
    color: #333333;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    column-gap: 1.4em;
    margin: 0 auto 2em;
    font-size: max(14px, min(1.8vw, 18px));
`

const BlogTag = styled.button`
    cursor: pointer;
    font-weight: 500;
    font-family: "Manrope";
    font-size: inherit;
    line-height: 1em;
`

function Post({ slug, date, title, image }) {
    return (
        <li>
            <Link href={`/blog/[slug]`} as={`/blog/${slug}`} scroll={false}>
                <a>
                    <PostDate>{date}</PostDate>
                    <PostTitle>{title}</PostTitle>
                </a>
            </Link>
        </li>
    )
}

export default function Blog({ posts, tags }) {
    const [tag, setTag] = useState("all")

    return (
        <>
            <SEO title="Siddharth's Blog — Notes on building a career in Design and Product" />

            <PageContainer
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <PageTitle style={{ maxWidth: 1000 }}>
                    Sidd’s notes chronicling oopsies and adventures building a
                    career in design, tech and product.
                </PageTitle>

                <BlogTags>
                    <BlogTag
                        onClick={() => setTag("all")}
                        style={{ opacity: tag === "all" ? 1 : 0.4 }}
                    >
                        #all
                    </BlogTag>

                    {tags.map((t, i) => (
                        <BlogTag
                            key={i}
                            style={{ opacity: tag === t ? 1 : 0.4 }}
                            onClick={() => setTag(t)}
                        >{`#${t}`}</BlogTag>
                    ))}
                </BlogTags>

                <PostList>
                    {posts.map((post, i) => {
                        // move this initial processing to getStaticProps
                        let src = ""
                        post.image ? (src = post.image[0].url) : (src = "")
                        // let dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');
                        let dateString = format(
                            new Date(post.date.toString()),
                            "dd/MM"
                        )

                        if (tag === "all" || post.tags.includes(tag)) {
                            return (
                                <Post
                                    key={i}
                                    slug={post.slug}
                                    date={dateString}
                                    title={post.page}
                                    image={src}
                                />
                            )
                        }
                    })}
                </PostList>
            </PageContainer>

            <PageFooter>
                Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                Notion.
            </PageFooter>
        </>
    )
}
