import React from "react"
import { graphql } from 'gatsby';


import HoverImg from "../components/hoverImg";
import SEO from "../components/seo";
import HomeSlider from "../components/homeSlider";


export default function IndexPage({ data }) {
    
    return (
        <>

            <SEO />

            <header className="site-header">
                <h1 className="site-header-text" >
                    <HoverImg img="1.jpg">Siddharth</HoverImg> builds prototypes as a <HoverImg img="2.gif">UX Engineer</HoverImg> Intern with the team at <HoverImg img="3.gif" pos="bottom">Headout.</HoverImg> Here’s what he’s been up to...
                </h1>
            </header>

            <HomeSlider edges={data.allNotionPageBlog.edges} />

        </>
    );
}

export const query = graphql`
    query {
        allNotionPageBlog(sort: {fields: [indexPage], order: ASC}) {
            edges {
                node {
                    title
                    slug
                    isDraft
                    imageNodes {
                        localFile {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 2000) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;