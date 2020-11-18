import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SEO from '@components/seo';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/a906ab2caf7e43289305e232d0fcfd25`).then((res) => res.json());
	return { props: { posts: data } }
}

const Post = ({ name, blurb, image, constraint, key }) => {

	const [open, setOpen] = useState(false);


	return (
		<>

			<AnimateSharedLayout type='crossfade'>
				<AnimatePresence>	
					{
						!open ?

						<motion.div className="play" whileTap={{ scale: 0.9 }} drag dragConstraints={constraint} layoutId={key} >
							<motion.div style={{ height: '100%', width: '100%' }} onTap={() => {setOpen(true)}}>
								<img src={image} draggable style={{ pointerEvents: "none" }}/>
							</motion.div>
							{/* <motion.h1 onTap={() => {setOpen(true)}}>{name}</motion.h1> */}
						</motion.div>
						
						: <motion.div className="play-open" layoutId={key}>
							<motion.h3 onTap={() => {setOpen(false)}}>{name}</motion.h3>
							<p>{blurb}</p>
						</motion.div>
					}
				</AnimatePresence>


			</AnimateSharedLayout>
		
		
		
		</>
	)
}

export default function Play({ posts }) {

	useEffect(() => {
		console.log(posts);
	})

	const playground = useRef(null);


	return (

		<>

			<SEO title="Siddharth's Playground — Experiments in Design and Code" />
		
			<motion.div className="page-container" exit={{ opacity: 0 }}>
				<h1 className="page-title">Playground housing my experiments in design and code.</h1>

				{/* TODO: use posts to generate playful grid with links */}

				<div className="playground" ref={playground}>

					<div className="pg-inner">
						{
							posts.map((post, i) => 
								<Post name={post.name} 
									blurb={post.blurb}
									constraint={playground}
									key={i}
									image={post['temp-media'][0].rawUrl}
								/> )
						}

					</div>

					

				</div>

			</motion.div>

		</>
	)
}
  