import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import HoverImg from '@components/hoverImage';

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

	return (
	
		<motion.div className="blog-container" exit={{ opacity: 0 }}>
			<header>My <HoverImg img="1.jpg">notes</HoverImg> detailing learning experiences and building a <HoverImg>career</HoverImg> in <HoverImg>design</HoverImg> and <HoverImg>product.</HoverImg></header>

			<div className="blog-tags">
				<div className="blog-tag">#all</div>

				{ tags.map((tag, i) => <div className="blog-tag" key={i}>{`#${tag}`}</div>) }
		
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
										<h4 className="post-title">{post.page}</h4>
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
  