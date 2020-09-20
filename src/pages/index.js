import React from "react"
import { graphql } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";
import ImageOnHover from "../components/imageOnHover";
import SEO from "../components/seo";
import Link from "gatsby-plugin-transition-link/AniLink";

export default function IndexPage({ data }) {

    SwiperCore.use([Mousewheel]);

    return (
        <>
            
            <SEO />
            <header className="header">
                <h1 className="site-header-text" >
                    <ImageOnHover img="1.jpg">Siddharth</ImageOnHover> builds prototypes as a <ImageOnHover img="2.gif">UX Engineer</ImageOnHover> Intern with the team at <ImageOnHover img="3.gif">Headout.</ImageOnHover> Here’s what he’s been up to...
                </h1>


                
            </header>
            <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true} loop={true}>
                {data.allNotionPageBlog.edges.map(edge => (
                    <SwiperSlide key={edge.node.slug}>
                        <Link className="article-card" paintDrip hex="#999999"
                            to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`} >
                            <div key={edge.node.title} className="article-image">
                                <Img style={{ height: `100%`, width: `100%` }} fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title} />
                            </div>
                            <h4 className="article-title">{edge.node.title}</h4>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export const query = graphql`
    query {
        allNotionPageBlog(filter: {isDraft: {eq: false}}, sort: {fields: [indexPage], order: ASC}) {
            edges {
                node {
                    title
                    slug
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