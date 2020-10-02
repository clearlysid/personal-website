import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";
// import Link from "gatsby-plugin-transition-link";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import gsap from 'gsap';


export default function HomeSlider({ edges }) {

    SwiperCore.use([Mousewheel]);

    async function TransitionToCardPage(pages){
        // wait until we have access to both pages
        const exit = await pages.exit
        const entry = await pages.entry
        // here we can access both pages
        // console.log(exit, entry)

        // You could measure the entry element here

        const currImageWidth = exit.node.parentElement.querySelector('.card').getBoundingClientRect().width
        const currImageHeight = exit.node.parentElement.querySelector('.card').getBoundingClientRect().height
        const currImageX = exit.node.parentElement.querySelector('.card').getBoundingClientRect().x
        const currImageY = exit.node.parentElement.querySelector('.card').getBoundingClientRect().y

        const featImageWidth = entry.node.parentElement.querySelector('.main-image').getBoundingClientRect().width
        const featImageHeight = entry.node.parentElement.querySelector('.main-image').getBoundingClientRect().height
        const featImageX = entry.node.parentElement.querySelector('.main-image').getBoundingClientRect().x
        const featImageY = entry.node.parentElement.querySelector('.main-image').getBoundingClientRect().y

        const scaleWidth = currImageWidth / featImageWidth
        const scaleHeight = currImageHeight / featImageHeight

        const moveX = currImageX - featImageX - 312
        const moveY = currImageY - featImageY

        //----------

         gsap.set(entry.node.parentElement.querySelector('.main-image'), {
            x: moveX,
            y: moveY,
            scaleY: scaleHeight,
            scaleX: scaleWidth,
            // transformOrigin: 'center',
        });
        gsap.set(entry.node.parentElement.querySelector('.main-image > picture > img'), {
            scaleX: 1/scaleWidth,
            scaleY: 1/scaleHeight
        });



        // console.log(scaleWidth, scaleHeight, moveX, moveY);
        gsap.set(entry.node.parentElement.querySelector('.main-title'), {
            opacity: 0,
            yPercent: 100,
            skewY: 4,
        });
        gsap.set(entry.node.parentElement.querySelector('main.notion'), {
            opacity: 0,
            y: 0,
        });
        
        gsap.set(entry.node.parentElement.querySelector('.back-button'), {
            opacity: 0
        });

        // start exit animation based on measurements if you want
        const exitTL = gsap.timeline();

        exitTL.to('header', {
            opacity: 0,
            skewY: 2,
            y: -100,
            duration: 0.6,
            ease: "expo.inOut", 
        })


        exitTL.then(async () => {
            // wait for the entering page to become visible
            await entry.visible
            
            // the entering page is visible here, can now animate
            const entryTL = gsap.timeline();
            
            entryTL.to(document.querySelector('.main-image'), {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                duration: 1,
                ease: "expo.inOut"
            })
            entryTL.to(document.querySelector('.main-image > picture > img'), {
                scaleX: 1,
                scaleY: 1,
                duration: 1,
                ease: "expo.inOut"
            }, "<")
            entryTL.to(document.querySelector('.main-title'), { opacity: 1, yPercent: 0, duration: 1, skewY: 0, ease: "power4.out" })
            entryTL.fromTo(document.querySelector('.back-button'), {opacity: 0},{
                opacity: 0.3,
                duration: 0.3,
                ease: "expo.inOut"
            })
            entryTL.to(document.querySelector('main.notion'), {
                opacity: 1,
                duration: 0.6,
                skewY: 0,
                ease: "expo.inOut",
                // stagger: 0.1,
            }, "<")
        })
    }

    return (
        <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
            {edges.map(edge => edge.node.isDraft === true &&
                (<SwiperSlide key={edge.node.slug}>
                    {/* <Link className="card" to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}
                        exit={{ length: 1 }} entry={{ length: 1 }} trigger={(pages) => TransitionToCardPage(pages)}>
                        <Img className="card-image" fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title} />
                        <div className="card-title">{edge.node.title}</div>
                    </Link> */}

                    <AniLink className="card" to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`} paintDrip hex="#999999">
                        <Img className="card-image" fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title} />
                        <div className="card-title">{edge.node.title}</div>
                    </AniLink>

                </SwiperSlide>)
            )}
        </Swiper>
    )
}