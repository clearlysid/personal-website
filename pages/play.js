import React, { useEffect } from "react"
import { motion } from "framer-motion"
import SEO from "@components/seo"
import PageTitle from "@components/page"

export async function getStaticProps() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/a906ab2caf7e43289305e232d0fcfd25`
    ).then(res => res.json())
    return { props: { posts: data } }
}

export default function Play({ posts }) {
    useEffect(() => {
        // console.log(posts)
    })

    return (
        <>
            <SEO title="Siddharth's Playground — Experiments in Design and Code" />

            <motion.div className="page-container" exit={{ opacity: 0 }}>
                <PageTitle>
                    Playground housing my experiments in design and code.
                </PageTitle>

                {posts.map((post, i) => (
                    <motion.div key={i} data-grid={{ x: 4, y: 0, w: 4, h: 1 }}>
                        <img src={post["temp-media"][0].rawUrl} alt="" />
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}
