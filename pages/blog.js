import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import SEO from '@components/seo';
import VanillaTilt from 'vanilla-tilt';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());

	// get all tags and make array of unique ones
	let alltags = [];
	data.map(post => post.tags).map(tags => tags.map(tag => alltags.push(tag)));
	const uniqueTags = [...new Set(alltags)];

	// filter out unpublished posts
	if (process.env.NODE_ENV !== "development") {data = data.filter(x => x.published)}

	return { props: { posts: data, tags: uniqueTags } }
}

function Post({ slug, date, title, image }) {

	return <li>
				<Link href={`/blog/[slug]`} as={`/blog/${slug}`} scroll={false}>
					<a>
						<div className="post-date">{date}</div>
						<h4 className="post-title">{title}</h4>
					</a>
				</Link>
				
			</li>
}

export default function Blog({ posts, tags }) {

	const [tag, setTag] = useState("all");

	useEffect(() => {
		VanillaTilt.init(document.querySelector(".sidds"), {
			max: 10,
			speed: 1000,
			reverse: true,
			scale: 0.95,
		});
	})

	return (

		<>

			<SEO title="Siddharth's Blog — Notes on building a career in Design and Product" />
		
			<motion.div className="page-container blog" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<h1 className="page-title">Sidd’s notes chronicling oopsies and adventures building a career in design, tech and product.</h1>

				<div className="blog-tags">
					<button className="blog-tag" onClick={() => setTag("all")} style={{ opacity: tag === 'all' ? 1 : 0.4 }}>#all</button>

					{tags.map((t, i) =>
						<button key={i}
							className="blog-tag" 
							style={{ opacity: tag === t ? 1 : 0.4 }}
							onClick={() => setTag(t)}>{`#${t}`}</button>
						)}
				</div>

				<div className="blog-list-wrapper">
					<ul className="post-list">
						{
							posts.map((post, i) => {

								// move this initial processing to getStaticProps
								let src = "";
								post.image ? src = post.image[0].url : src = ""
								// let dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');
								let dateString = format(new Date(post.date.toString()), 'dd/MM');

								if (tag === "all" || post.tags.includes(tag)) {
									return <Post key={i} slug={post.slug} date={dateString} title={post.page} image={src} />
								}

							})
						}
					</ul>

					<a className="sidds" href="https://www.twitter.com/clearlysid" rel="noreferrer" target="_blank">
						<img class="sidds-blog" src="/blog/sidds.png" alt=""/>
						<img class="sidds-text" src="/blog/sidds-text.svg" alt=""/>
					</a>

				</div>
				
			</motion.div>

			<footer className="page-footer">Copyleft ©{new Date().getFullYear()}, Built on Next.js via Notion.</footer>

		</>
	)
}
  