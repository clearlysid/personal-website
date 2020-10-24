import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import { motion } from 'framer-motion';
import { useGlobalDispatchContext } from '../context/globalContext';
import { useAnalytics } from "../components/analytics";

export default function HomeSlider({ posts }) {

	SwiperCore.use([Mousewheel]);
	const { trackEvent } = useAnalytics();

	const dispatch = useGlobalDispatchContext();
	const onCursor = style => dispatch({ type: 'CURSOR_TYPE', cursorType: style });

	const [hovered, setHovered] = useState(false);

	useEffect(() => {VanillaTilt.init(document.querySelectorAll(".card-image"), { max: 4, speed: 100, reverse: true })}, []);

	

	return (
		<>
	
			{
				hovered &&
				<motion.svg id="slider-filter" key="svg">
					<filter id="noise" x="0" y="0" >
						<motion.feTurbulence
							result="turbulence"
							numOctaves="1"
							id="turbulence" 
							animate={{ baseFrequency: ["0", "0.008"] }}
							exit={{ baseFrequency: "0"}}
							transition={{ duration: 16, ease: "easeOut" , yoyo: Infinity}}
							key="pasta" />
						<feDisplacementMap in="SourceGraphic" in2="turbulence" id="displacement" scale="20" />
					</filter>
				</motion.svg>
			}

			<Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
				{
					posts.map((post, i) => {
						let src = "";
						post.image ? src = post.image[0].url : src = ""

						return (<SwiperSlide key={post.slug}>
							<Link href={`/blog/[slug]`} as={`/blog/${post.slug}`}>
								<motion.a className="card"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: i / 4, duration: 0.6 }}
									onClick={() => {
										trackEvent({
										  action: "Clicked Slider",
										  category: "HomeNav"
										});
									  }}>
									<img className="card-image" src={src} alt={post.page}
										onMouseEnter={() => {onCursor('read'), setHovered(true)}}
										onMouseLeave={() => {onCursor(); setHovered(false)}} />
									<div className="card-title">{post.page}</div>
								</motion.a>
							</Link>
						</SwiperSlide>)
					})
				}
			</Swiper>
		
		</>
    )
}