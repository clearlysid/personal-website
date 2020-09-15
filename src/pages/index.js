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
                 {/* 
                 <svg width="116" height="52" viewBox="0 0 116 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.858 48.763C7.064 46.6777 5.53067 44.3163 4.258 41.679C2.98533 39.057 2.01933 36.3047 1.36 33.422C0.700667 30.5393 0.394 27.672 0.44 24.82C0.394 21.968 0.700667 19.1007 1.36 16.218C2.01933 13.32 2.98533 10.56 4.258 7.938C5.53067 5.316 7.064 2.96233 8.858 0.876998L12.952 3.913C11.112 6.13633 9.64 8.38267 8.536 10.652C7.44733 12.9213 6.66533 15.2367 6.19 17.598C5.71467 19.944 5.46933 22.3513 5.454 24.82C5.46933 27.2887 5.71467 29.7037 6.19 32.065C6.68067 34.411 7.47033 36.7263 8.559 39.011C9.64767 41.2803 11.112 43.5113 12.952 45.704L8.858 48.763ZM42.9217 22.75C41.4037 22.75 40.0161 22.382 38.7587 21.646C37.5014 20.8947 36.4971 19.898 35.7457 18.656C35.0097 17.3987 34.6417 16.0033 34.6417 14.47C34.6417 12.9673 35.0251 11.5873 35.7917 10.33C36.5584 9.07266 37.5704 8.06833 38.8277 7.317C40.0851 6.56567 41.4497 6.19 42.9217 6.19C44.4397 6.19 45.8197 6.56567 47.0617 7.317C48.3191 8.053 49.3234 9.04967 50.0747 10.307C50.8261 11.549 51.2017 12.9367 51.2017 14.47C51.2017 16.0033 50.8261 17.3987 50.0747 18.656C49.3234 19.898 48.3191 20.8947 47.0617 21.646C45.8197 22.382 44.4397 22.75 42.9217 22.75ZM42.9217 18.012C43.5657 18.012 44.1561 17.851 44.6927 17.529C45.2294 17.207 45.6587 16.7777 45.9807 16.241C46.3027 15.7043 46.4637 15.114 46.4637 14.47C46.4637 13.826 46.3027 13.2357 45.9807 12.699C45.6587 12.1623 45.2294 11.733 44.6927 11.411C44.1561 11.089 43.5657 10.928 42.9217 10.928C42.2777 10.928 41.6874 11.089 41.1507 11.411C40.6141 11.733 40.1847 12.1623 39.8627 12.699C39.5407 13.2357 39.3797 13.826 39.3797 14.47C39.3797 15.114 39.5407 15.7043 39.8627 16.241C40.1847 16.7777 40.6141 17.207 41.1507 17.529C41.6874 17.851 42.2777 18.012 42.9217 18.012ZM54.1087 51.04C49.294 51.04 45.3534 50.258 42.2867 48.694C39.1894 47.1607 37.0274 44.9067 35.8007 41.932H40.4007C41.566 43.2507 43.2834 44.3393 45.5527 45.198C47.822 46.0567 50.674 46.486 54.1087 46.486C57.206 46.486 59.8894 46.1027 62.1587 45.336C64.4587 44.5693 66.268 43.4347 67.5867 41.932H72.1867C70.6534 45.1213 68.3074 47.4367 65.1487 48.878C61.99 50.3193 58.31 51.04 54.1087 51.04ZM63.6307 22.75C62.1127 22.75 60.725 22.382 59.4677 21.646C58.2104 20.8947 57.206 19.898 56.4547 18.656C55.7187 17.3987 55.3507 16.0033 55.3507 14.47C55.3507 12.9673 55.734 11.5873 56.5007 10.33C57.2674 9.07266 58.2794 8.06833 59.5367 7.317C60.794 6.56567 62.1587 6.19 63.6307 6.19C65.1487 6.19 66.5287 6.56567 67.7707 7.317C69.028 8.053 70.0324 9.04967 70.7837 10.307C71.535 11.549 71.9107 12.9367 71.9107 14.47C71.9107 16.0033 71.535 17.3987 70.7837 18.656C70.0324 19.898 69.028 20.8947 67.7707 21.646C66.5287 22.382 65.1487 22.75 63.6307 22.75ZM63.6307 18.012C64.2747 18.012 64.865 17.851 65.4017 17.529C65.9384 17.207 66.3677 16.7777 66.6897 16.241C67.0117 15.7043 67.1727 15.114 67.1727 14.47C67.1727 13.826 67.0117 13.2357 66.6897 12.699C66.3677 12.1623 65.9384 11.733 65.4017 11.411C64.865 11.089 64.2747 10.928 63.6307 10.928C62.9867 10.928 62.3964 11.089 61.8597 11.411C61.323 11.733 60.8937 12.1623 60.5717 12.699C60.2497 13.2357 60.0887 13.826 60.0887 14.47C60.0887 15.114 60.2497 15.7043 60.5717 16.241C60.8937 16.7777 61.323 17.207 61.8597 17.529C62.3964 17.851 62.9867 18.012 63.6307 18.012ZM80.6597 48.763C82.4537 46.6777 83.987 44.3163 85.2597 41.679C86.5324 39.057 87.4984 36.3047 88.1577 33.422C88.817 30.5393 89.1237 27.672 89.0777 24.82C89.1237 21.968 88.817 19.1007 88.1577 16.218C87.4984 13.32 86.5324 10.56 85.2597 7.938C83.987 5.316 82.4537 2.96233 80.6597 0.876998L76.5657 3.913C78.4057 6.13633 79.87 8.38267 80.9587 10.652C82.0627 12.9213 82.8524 15.2367 83.3277 17.598C83.803 19.944 84.0484 22.3513 84.0637 24.82C84.0484 27.2887 83.7954 29.7037 83.3047 32.065C82.8294 34.411 82.0474 36.7263 80.9587 39.011C79.87 41.2803 78.4057 43.5113 76.5657 45.704L80.6597 48.763ZM115.257 7.386L109.691 5.5C109.139 12.124 107.851 19.024 105.827 24.452C103.941 29.42 100.997 34.066 97.4094 36.55L100.997 41.886C104.355 39.034 107.943 33.422 109.875 28.546C111.669 23.9 113.187 17.69 114.107 12.492C114.383 11.02 114.843 8.996 115.257 7.386Z" fill="#111111"/>
                </svg>
                 
                 */}
                
                <h2 className="site-header-text">
                    <span>Siddharth</span> builds prototypes as a <span>UX Engineer</span> Intern at <span>Headout.</span> Here’s what he’s been writing about lately...
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