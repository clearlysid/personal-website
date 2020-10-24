import { NotionRenderer } from '../../components/notion';
import SmoothScroll from '../../components/smoothScroll';
import BackButton from '../../components/backButton';
import SEO from '../../components/seo';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export async function getStaticProps({ params: { slug } }) {
    // Get all posts again, find matching one by slug, pass blocks as prop
	const posts = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());
	const post = posts.find((t) => t.slug === slug);
	const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post.id}`).then((res) => res.json());
    return { props: { blocks, post } };
}

export default function Article ({ post, blocks }) {
	if (!post) return null;

	const dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');

    return (
		<>
			<SEO title={`${post.page} — Siddharth's Blog`} image={post.image} url={`https://siddharth.fyi/blog/${post.slug}`} />

			<BackButton />

			<SmoothScroll>
				<article className="notion">
					<motion.h1
						className="notion main-title"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 1 }}>{post.page}</motion.h1>
					<motion.div
						className="notion main-date"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.4 }}
						exit={{ opacity: 1 }}>{dateString}</motion.div>

					<motion.img
						className="notion main-image"
						src={post.image[0].url}
						layoutId={post.slug}
						initial={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1 }}
						transition={{ ease: 'easeInOut'}}
						/>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 1 }}>
						<NotionRenderer blockMap={blocks} />
					</motion.div>


					<footer className="notion main-footer">
						<hr className="notion"/>
						<h3 className="notion">Thanks for reading!</h3>
						<p className="notion">Shoot me a email/tweet if you want to discuss something further, offer feedback or share your thoughts. Trying to be deliberate about having meaningful conversations!</p>

						<p className="notion" style={{fontStyle: 'normal'}}>
							<a href='mailto:hey@siddharth.fyi'>hey@siddharth.fyi</a> / <a href="https://www.twitter.com/clearlysid" target="_blank" rel="noreferrer">@clearlysid</a>
						</p>
					</footer>
					
				</article>
				<footer className="site-footer">Copyleft ©{new Date().getFullYear()}, Built on Next.js via Notion.</footer>
			</SmoothScroll>	
		</>
    );
};

export async function getStaticPaths() {
	const data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());

	if (process.env.LOCAL_KEY === "yolo") {
		return { paths: data.map((row) => `/blog/${row.slug}`), fallback: false };
	} else {
		return { paths: data.filter(row => row.published).map((row) => `/blog/${row.slug}`), fallback: false };
	}
}