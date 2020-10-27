import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import HoverImg from '@components/hoverImage';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());
	
	if (process.env.LOCAL_KEY === "yolo") {
		return { props: { posts: data } };
	} else {
		return { props: { posts: data.filter(x => x.published) } };
	}
}

export default function Blog({ posts }) {
	return (

		<motion.div className="blog-container" exit={{ opacity: 0 }}>
			<header>My <HoverImg img="1.jpg">notes</HoverImg> detailing learning experiences and building a <HoverImg>career</HoverImg> in <HoverImg>design</HoverImg> and <HoverImg>product.</HoverImg></header>

			<div className="blog-tags">
				<div className="blog-tag">#all</div>
				<div className="blog-tag">#design</div>
				<div className="blog-tag">#product</div>
				<div className="blog-tag">#code</div>
				<div className="blog-tag">#career</div>
				<div className="blog-tag">#misc</div>
			</div>

			<ul className="post-list">
				{
					posts.map((post, i) => {
						let src = "";
						post.image ? src = post.image[0].url : src = ""
						let dateString = format(new Date(post.date.toString()), 'MMMM do, yyyy');

						return (
							<li key={i}>
								<Link href={`/blog/[slug]`} as={`/blog/${post.slug}`}>
									<a>
										<div className="post-date">{dateString}</div>
										<div className="post-title">{post.page}</div>
									</a>
								</Link>
							</li>
						)
					})
				}
			</ul>



		</motion.div>
	)
}
  