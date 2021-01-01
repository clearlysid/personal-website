import React from "react"
import { NotionRenderer } from "@components/notion"
import SmoothScroll from "@components/smoothScroll"
import BackButton from "@components/backButton"
import SEO from "@components/seo"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { useGlobalDispatchContext } from "@context/globalContext"
import { PageFooter } from "@components/page"
import styled from "styled-components"
// import Image from 'next/image';

export async function getStaticProps({ params: { slug } }) {
    // Get all posts again, find matching one by slug, pass blocks as prop
    const posts = await fetch(
        `https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`
    ).then(res => res.json())
    const post = posts.find(t => t.slug === slug)
    const blocks = await fetch(
        `https://notion-api.splitbee.io/v1/page/${post.id}`
    ).then(res => res.json())

    return { props: { blocks, post } }
}

const ArticleTitle = styled.h1`
    max-width: min(800px, 90%);
    margin: 0 auto;
    text-align: center;
    padding-bottom: 0.2em;
`

const ArticleDate = styled.div`
    max-width: min(800px, 90%);
    margin: 0 auto;
    text-align: center;
    opacity: 0.4;
    font-size: 1rem;
    padding-bottom: 2em;
    font-family: "Manrope", sans-serif;
`

const ArticleImage = styled.img`
    width: max-content;
    width: min(1000px, 100%) !important;
    height: min(max(200px, 50vh), 400px) !important;
    overflow: hidden;
    margin: auto;
    margin-bottom: 2rem;
    border-radius: 0;
`

const ArticleFooter = styled.footer`
    width: min(720px, 90%);
    margin-left: auto;
    margin-right: auto;
`

const StyledArticle = styled(motion.article)`
    height: 100%;
    margin: 0 auto;
`

const ArticleBodyWrapper = styled(motion.div)`
    & > main.notion > * {
        width: min(720px, 90%);
        margin-left: auto;
        margin-right: auto;
    }
`

export default function Article({ post, blocks }) {
    if (!post) return null

    const dispatch = useGlobalDispatchContext()
    const onCursor = style =>
        dispatch({ type: "CURSOR_TYPE", cursorType: style })

    const dateString = format(new Date(post.date.toString()), "MMMM do, yyyy")

    return (
        <>
            <SEO
                title={`${post.page} — Siddharth's Blog`}
                image={post.image}
                url={`https://sidds.me/blog/${post.slug}`}
            />

            <BackButton link="/blog" text="~(■_■ ~)" />

            <SmoothScroll>
                <StyledArticle
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <ArticleTitle>{post.page}</ArticleTitle>
                    <ArticleDate>{dateString}</ArticleDate>
                    <ArticleImage src={post.image[0].rawUrl} />

                    <ArticleBodyWrapper>
                        <NotionRenderer blockMap={blocks} />
                    </ArticleBodyWrapper>

                    <ArticleFooter>
                        <p style={{ fontStyle: "normal" }}>
                            Thanks for reading! <br />
                            <a href="mailto:hey@sidds.me" target="_blank">
                                hey@sidds.me
                            </a>{" "}
                            /{" "}
                            <a
                                href="https://www.twitter.com/clearlysid"
                                target="_blank"
                                rel="noreferrer"
                            >
                                @clearlysid
                            </a>
                        </p>
                    </ArticleFooter>
                </StyledArticle>
                <PageFooter>
                    Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                    Notion.
                </PageFooter>
            </SmoothScroll>
        </>
    )
}

export async function getStaticPaths() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`
    ).then(res => res.json())
    if (process.env.NODE_ENV !== "development") {
        data = data.filter(x => x.published)
    }
    return { paths: data.map(row => `/blog/${row.slug}`), fallback: false }
}
