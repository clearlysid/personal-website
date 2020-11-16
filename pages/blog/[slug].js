import React, {useEffect} from 'react';
import { NotionRenderer } from '@components/notion';
import SmoothScroll from '@components/smoothScroll';
import BackButton from '@components/backButton';
import SEO from '@components/seo';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useGlobalDispatchContext } from '@context/globalContext';
// import Image from 'next/image';

export async function getStaticProps({ params: { slug } }) {
    // Get all posts again, find matching one by slug, pass blocks as prop
	const posts = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());
	const post = posts.find((t) => t.slug === slug);
	const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post.id}`).then((res) => res.json());
    return { props: { blocks, post } };
}

export default function Article ({ post, blocks }) {
	if (!post) return null;

	const dispatch = useGlobalDispatchContext();
	const onCursor = style => dispatch({ type: 'CURSOR_TYPE', cursorType: style });

	const dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');

	useEffect(() => {
		onCursor();
	}, []);

    return (
		<>
			<SEO title={`${post.page} — Siddharth's Blog`} image={post.image} url={`https://siddharth.fyi/blog/${post.slug}`} />

			<BackButton link="/blog" text="~(■_■ ~)" />

			<SmoothScroll>
				<motion.article className="notion" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<motion.h1
						className="notion main-title">{post.page}</motion.h1>
					<motion.div
						className="notion main-date" animate={{ opacity: 0.4 }}>{dateString}</motion.div>
		
					<motion.img className="notion main-image" src={post.image[0].rawUrl} />
					
					<motion.div>
						<NotionRenderer blockMap={blocks} />
					</motion.div>


					<footer className="notion main-footer">
						<p className="notion" style={{fontStyle: 'normal'}}>Thanks for reading! <br />
						<a href='mailto:hey@sidds.me'>hey@sidds.me</a> / <a href="https://www.twitter.com/clearlysid" target="_blank" rel="noreferrer">@clearlysid</a>
						</p>
					</footer>
					
				</motion.article>
				<footer className="site-footer">Copyleft ©{new Date().getFullYear()}, Built on Next.js via Notion.</footer>
			</SmoothScroll>	
		</>
    );
};

export async function getStaticPaths() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json())
	if (!process.env.NODE_ENV === "development") {data = data.filter(x => x.published)}
	return { paths: data.map((row) => `/blog/${row.slug}`), fallback: false };
}