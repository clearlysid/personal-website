import React from "react"
import App from "../layouts/app"
import { graphql, Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";

export default function IndexPage({ data }) {

    const transition = {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
    }

    SwiperCore.use([Mousewheel]);

    return (
        <App back={false}>
             <header className="header" key="header" exit={{opacity: 0}} transition={transition}>
                <h2 className="site-header-text">
                    {/* <span>Siddharth</span> builds prototypes as a <span>UX Engineer</span> Intern at <span>Headout.</span> Here’s what he’s been writing about lately... */}
                    <span>Siddharth</span> builds prototypes as a <span>UX Engineer</span> Intern with the team at <span>Headout.</span> Here’s what he’s been up to...
                </h2>
            </header>

            <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true} loop={true}>
                {data.allNotionPageBlog.edges.map(edge => (
                    <SwiperSlide key={edge.node.slug}>
                        <Link className="article-card" to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                            <div key={edge.node.title} className="article-image" whileHover={{ scale: 0.98 }} transition={transition}>
                                <Img style={{height: `100%`, width: `100%` }} fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title}/>
                            </div>
                            <h4 className="article-title">{edge.node.title}</h4>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </App>
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