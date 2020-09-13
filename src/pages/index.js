import React from "react"
import App from "../layouts/app"
import Header from "../components/header"
import { graphql, Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";
import { motion } from "framer-motion"

export default function IndexPage({ data }) {
    SwiperCore.use([Mousewheel]);

    return (
        <App>
            <Header />
            <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
                {data.allNotionPageBlog.edges.map(edge => (
                    <SwiperSlide key={edge.node.slug}>
                        <Link className="article-card" to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                            <motion.div className="article-image" whileHover={{ scale: 0.98 }}>
                                <Img style={{height: `100%`, width: `100%`}} fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title}/>
                            </motion.div>
                            <h4 className="article-title" >{edge.node.title}</h4>
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
                                fluid(maxWidth: 1000) {
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