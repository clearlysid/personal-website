import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import { motion } from 'framer-motion';
import { useGlobalDispatchContext } from "@context/globalContext";
import { useAnalytics } from "@hooks/analytics";
import { Curtains, Plane } from 'curtainsjs';

export default function HomeSlider({ posts }) {

	SwiperCore.use([Mousewheel]);
	const { trackEvent } = useAnalytics();

	const dispatch = useGlobalDispatchContext();
	const onCursor = style => dispatch({ type: 'CURSOR_TYPE', cursorType: style });

	const [hovered, setHovered] = useState(false);

	useEffect(() => {VanillaTilt.init(document.querySelectorAll(".card-image"), { max: 4, speed: 100, reverse: true })}, []);

	// useEffect(() => {
	// 	const vs = `
	// 		precision mediump float;
	// 		attribute vec3 aVertexPosition;
	// 		attribute vec2 aTextureCoord;
	// 		uniform mat4 uMVMatrix;
	// 		uniform mat4 uPMatrix;
	// 		varying vec3 vVertexPosition;
	// 		varying vec2 vTextureCoord;
	// 		uniform float uTime;
	// 		void main() {
	// 			vec3 vertexPosition = aVertexPosition;
	// 			float waveCoords = ((uTime / 45.0) * 3.5) - 1.75;
	// 			float distanceToWave = distance(vec2(vertexPosition.x, 0.0), vec2(waveCoords, 0.0));
	// 			vertexPosition.z -= (cos(clamp(distanceToWave, 0.0, 0.75) * 3.141592) - cos(0.75 * 3.141592) + (2.0 * sin(3.141592 * uTime / 90.0))) * 0.025;
	// 			gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
	// 			vTextureCoord = aTextureCoord;
	// 			vVertexPosition = vertexPosition;
	// 		}
	// 		`;
	// 	const fs = `
	// 		precision mediump float;
	// 		uniform float uTime;
	// 		varying vec3 vVertexPosition;
	// 		varying vec2 vTextureCoord;
	// 		uniform sampler2D uExample;
	// 		void main() {
	// 			vec2 textureCoords = vec2(vTextureCoord.x, vTextureCoord.y);
	// 			vec4 finalColor = texture2D(uExample, textureCoords);
	// 			gl_FragColor = finalColor;
	// 		}
	// 		`;
				
	// 	const curtains = new Curtains({ container: "canvas" });
	// 	var planeElement = document.getElementsByClassName("plane")[0]
	// 	var params = {
	// 		vertexShader: vs,
	// 		fragmentShader: fs,
	// 		widthSegments: 20,
	// 		heightSegments: 1,
	// 		texturesOptions: {
	// 			minFilter: curtains.gl.LINEAR_MIPMAP_NEAREST
	// 		},
	// 		uniforms: {
	// 			time: {
	// 				name: "uTime",
	// 				type: "1f",
	// 				value: 0,
	// 			},
	// 		},
	// 	}

	// 	const plane = new Plane(curtains, planeElement, params);

	// 	plane.onReady(function() {
	// 		plane.userData.mouseOver = false;
	// 		planeElement.addEventListener("mouseenter", function(e) { plane.userData.mouseOver = true; });
	// 		planeElement.addEventListener("mouseleave", function(e) { plane.userData.mouseOver = false; });
	// 	}).onRender(() => {
	// 		if(plane.userData.mouseOver) { plane.uniforms.time.value += (45 - plane.uniforms.time.value) * 0.0375; }
	// 		else { plane.uniforms.time.value += (0 - plane.uniforms.time.value) * 0.0375; }
	// 	});
	// }, [])

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

			{/* <div id="canvas"></div> */}

			<Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true}>
				{
					posts.map((post, i) => {
						let src = "";
						post.image ? src = post.image[0].url : src = ""

						return (<SwiperSlide key={post.slug}>
							<Link href={`/blog/[slug]`} as={`/blog/${post.slug}`}>
								<motion.a className="card plane"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: i / 3, duration: 0.6 }}
									onMouseEnter={() => {onCursor('read'), setHovered(true)}}
									onMouseLeave={() => {onCursor(); setHovered(false)}} 
									onClick={() => {trackEvent({ action: "Clicked Slider", category: "HomeNav" });}}>
									<img className="card-image" src={src} alt={post.page} />
									{/* <img src={"https://unsplash.it/300/500?random=" + 2} alt=""/> */}
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