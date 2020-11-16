import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '@components/seo';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/a906ab2caf7e43289305e232d0fcfd25`).then((res) => res.json());

	return { props: { posts: data } }
}

export default function Play({ posts }) {

	useEffect(() => {
		console.log(posts);
	})

	const playground = useRef(null);


	return (

		<>

			<SEO title="Siddharth's Playground — Experiments in Design and Code" />
		
			<motion.div className="blog-container" exit={{ opacity: 0 }}>
				<header>All work and no play makes Sid a dull boi, so here's a few of my 'for fun' projects.</header>

				{/* TODO: use posts to generate playful grid with links */}

				<div className="playground" ref={playground}>

					<div className="pg-inner">
						{
							posts.map(post => {

								return <motion.div className="play" whileTap={{ scale: 0.9 }} drag dragConstraints={playground}>
									<h3>{post.name}</h3>
									<p>{post.blurb}</p>
								</motion.div>
							})
						}

					</div>

					

				</div>

			</motion.div>

		</>
	)
}
  