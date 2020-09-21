import React from "react"
import { graphql } from 'gatsby';


import ImageOnHover from "../components/imageOnHover";
import SEO from "../components/seo";
import HomeSlider from "../components/homeSlider";


export default function IndexPage({ data }) {
    
    return (
        <>

            <SEO />


                <header className="header">
                    <h1 className="site-header-text" >
                        <ImageOnHover img="1.jpg">Siddharth</ImageOnHover> builds prototypes as a <ImageOnHover img="2.gif">UX Engineer</ImageOnHover> Intern with the team at <ImageOnHover img="3.gif">Headout.</ImageOnHover> Here’s what he’s been up to...
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
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;