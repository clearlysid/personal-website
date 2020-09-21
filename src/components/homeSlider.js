import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";
import Link from "gatsby-plugin-transition-link/AniLink";


export default function HomeSlider({ edges }) {

    SwiperCore.use([Mousewheel]);
    
    return (
        <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
            {edges.map(edge => edge.node.isDraft === true && (<SwiperSlide key={edge.node.slug}>
                    <Link className="article-card" paintDrip hex="#999999"
                        to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`} >
                        <div key={edge.node.title} className="article-image">
                            <Img style={{ height: `100%`, width: `100%` }} fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title} />
                        </div>
                        <h4 className="article-title">{edge.node.title}</h4>
                    </Link>
                </SwiperSlide>)
            )}
        </Swiper>
    )

}