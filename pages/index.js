import React, { useEffect, useRef } from "react"
import SEO from "@components/seo"
import { motion } from "framer-motion"
import { PageTitle, PageFooter } from "@components/page"
import styled from "styled-components"

export async function getStaticProps() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`
    ).then(res => res.json())

    if (!process.env.NODE_ENV === "development") {
        data = data.filter(x => x.published)
    }

    return { props: { posts: data } }
}

const StyledDiv = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    column-gap: 200px;
    overflow: hidden;
    padding: 0px 120px;
    min-height: 100vh;

    @media (max-width: 700px) {
        width: 100vw;
        grid-auto-flow: row;
        /* row-gap: 80px; */
        padding: 100px 0;
    }
`

const StyledSection = styled.section`
    max-width: 1000px;
    width: 80vw;
    height: 70vh;

    @media (max-width: 700px) {
        margin: 0 auto 4rem;
        width: 90vw;
        height: 60vw;
        border-radius: 0.4rem;
    }
`

export default function Home({ posts }) {
    const scrollRef = useRef(null)
    const scrollbarRef = useRef(null)

    useEffect(() => {
        if (window.innerWidth > 700) {
            import("locomotive-scroll").then(locomotiveModule => {
                const scroll = new locomotiveModule.default({
                    el: scrollRef.current,
                    smooth: true,
                    direction: "horizontal",
                    gestureDirection: "both",
                    scrollbarContainer: scrollbarRef.current,
                    smartphone: {
                        smooth: false,
                        direction: "vertical",
                    },
                })
            })
            return () => {
                scroll && scroll.destroy && scroll.destroy()
                document.documentElement.removeAttribute(
                    "data-scroll-direction"
                )
                document.documentElement.classList.remove("has-scroll-init")
                document.documentElement.classList.remove("has-scroll-smooth")
            }
        }
    }, [])

    return (
        <>
            <SEO />

            <div
                ref={scrollRef}
                style={{
                    minHeight: "100vh",
                    width: "max-content",
                }}
            >
                <StyledDiv>
                    <PageTitle
                        style={{
                            maxWidth: 410,
                            width: "100%",
                            padding: "0 1rem",
                            fontSize: "max(20px, min(4vw, 32px))",
                            color: "#cccccc",
                        }}
                    >
                        Welcome to the folio of{" "}
                        <span style={{ color: "#333333" }}>
                            Siddharth / @clearlysid.
                        </span>
                        {` `}
                        Currently a{" "}
                        <span style={{ color: "#333333" }}>
                            UX Engineer
                        </span> at{" "}
                        <span style={{ color: "#333333" }}>Headout,</span>{" "}
                        working on my Bachelor’s thesis and tinkering with
                        design, code and sound.
                    </PageTitle>

                    {/* render posts here somehow */}

                    <StyledSection
                        data-scroll
                        data-scroll-speed="-1"
                        style={{ background: "lightblue" }}
                    ></StyledSection>
                    <StyledSection
                        data-scroll
                        data-scroll-speed="1"
                        style={{
                            background: "lightgreen",
                        }}
                    ></StyledSection>
                    <StyledSection
                        data-scroll
                        data-scroll-speed="2"
                        style={{
                            background: "lightsalmon",
                        }}
                    ></StyledSection>
                    <StyledSection
                        data-scroll
                        data-scroll-speed="0"
                        style={{
                            background: "purple",
                        }}
                    ></StyledSection>
                </StyledDiv>
            </div>

            <div className="scrollbar" ref={scrollbarRef}></div>
            <PageFooter>
                Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                Notion.
            </PageFooter>
        </>
    )
}
