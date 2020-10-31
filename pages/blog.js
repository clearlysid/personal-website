import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import HoverImg from '@components/hoverImage';
import SEO from '@components/seo';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());

	// get all tags and make array of unique ones
	let alltags = [];
	data.map(post => post.tags).map(tags => tags.map(tag => alltags.push(tag)));
	const uniqueTags = [...new Set(alltags)];

	// filter out unpublished posts
	if (!process.env.NODE_ENV === "development") {data = data.filter(x => x.published)}

	return { props: { posts: data, tags: uniqueTags } }
}

export default function Blog({ posts, tags }) {

	const [tag, setTag] = useState("all");

	return (

		<>

			<SEO title="Siddharth's Blog — Notes on building a career in Design and Product" />
		
			<motion.div className="blog-container" exit={{ opacity: 0 }}>
				<header>My <HoverImg img="gifs/note.gif">notes</HoverImg> detailing learning experiences and building a <HoverImg img="gifs/career.gif" pos="bottom">career</HoverImg> in <HoverImg img="gifs/design.gif" pos="bottom">design</HoverImg> and <HoverImg img="gifs/product.gif" pos="bottom">product.</HoverImg></header>

				<div className="blog-tags">
					<button className="blog-tag" onClick={() => setTag("all")}>#all</button>

					{ 
						tags.map((t, i) => {
							return <button className="blog-tag" key={i} onClick={() => setTag(t)}>{`#${t}`}</button>
						})
					}
			
				</div>

				<ul className="post-list">
					{
						posts.map((post, i) => {

							// move this initial processing to getStaticProps
							let src = "";
							post.image ? src = post.image[0].url : src = ""
							let dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');

							if (tag === "all" || post.tags.includes(tag)) {
								return (
									<li key={i}>
										<Link href={`/blog/[slug]`} as={`/blog/${post.slug}`} scroll={false}>
											<a>
												<div className="post-date">{dateString}</div>
												<h4 className="post-title">{post.page}</h4>
											</a>
										</Link>
									</li>
								)
							}

						})
					}
				</ul>
			</motion.div>

		</>
	)
}
  