import React, { useEffect } from "react"
import { NotionRenderer } from "@components/notion"
import SmoothScroll from "@components/smoothScroll"
import BackButton from "@components/backButton"
import SEO from "@components/seo"
import { useGlobalDispatchContext } from "@context/globalContext"

export async function getStaticProps({ params: { slug } }) {
    // Get all projects again, find matching one by slug, then pass metadata and blockdata as props
    const projects = await fetch(
        `https://notion-api.splitbee.io/v1/table/5b8ff472835546eca25eb3f2c063605d`
    ).then(res => res.json())

    const project = projects.find(t => t.slug === slug)
    const blocks = await fetch(
        `https://notion-api.splitbee.io/v1/page/${project.id}`
    ).then(res => res.json())
    return { props: { project, blocks } }
}

export default function Project({ project, blocks }) {
    if (!project) return null

    const dispatch = useGlobalDispatchContext()
    const onCursor = style =>
        dispatch({ type: "CURSOR_TYPE", cursorType: style })

    // console.log(project);

    useEffect(() => {
        onCursor()
    }, [])

    return (
        <>
            {/* <SEO title={`${project.page} — Siddharth's Portfolio`} image={project.image[0].rawUrl} url={`https://siddharth.fyi/blog/${project.slug}`} /> */}

            <BackButton link="/" text="back to home" />

            <SmoothScroll>
                <div className="project-hero">
                    <h1 className="project-title" style={{ color: "white" }}>
                        How we solved this big problem by doing this small thing
                    </h1>

                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project1.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project2.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project3.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project4.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project5.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project6.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project7.jpg")',
                        }}
                    ></div>
                    <div
                        className="project-meta-image"
                        style={{
                            backgroundImage: 'url("/project/project8.jpg")',
                        }}
                    ></div>
                </div>
                <div>hi</div>

                <footer className="site-footer">
                    Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                    Notion.
                </footer>
            </SmoothScroll>
        </>
    )
}

export async function getStaticPaths() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/5b8ff472835546eca25eb3f2c063605d`
    ).then(res => res.json())
    if (!process.env.NODE_ENV === "development") {
        data = data.filter(x => x.published)
    }
    return { paths: data.map(row => `/projects/${row.slug}`), fallback: false }
}
