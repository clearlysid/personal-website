import React, { useEffect } from "react"
import App from "../layouts/app"
import InterimHeader from "../components/interimHeader"
import { graphql, Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
// import 'swiper/swiper.scss';



function IndexPage({ data }) {
    SwiperCore.use([Mousewheel]);

    return (
        <App>

            <InterimHeader />

            <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
                {data.allNotionPageBlog.edges.map(edge => (
                    <SwiperSlide>
                        <Link key={edge.node.slug} to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                            <div className="article-card">
                                <div className="article-image">
                                    <img src={edge.node.imageNodes[0].localFile.publicURL} ></img>
                                </div>
                                <h4 className="article-title">{edge.node.title}</h4>
                            </div>
                        </Link>
                    </SwiperSlide>

                ))}
            </Swiper>
        </App>
    );
}

export default IndexPage

export const query = graphql`
    query {
        allNotionPageBlog(
        filter: { isDraft: { eq: false } }
        sort: { fields: [indexPage], order: ASC }
        ) {
        edges {
            node {
                title
                slug
                imageNodes {
                    localFile {
                        publicURL
                    }
                }
            }
        }
        }
    }
`;