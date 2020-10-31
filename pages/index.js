import HoverImage from "@components/hoverImage";
import SEO from "@components/seo";
import HomeSlider from "@components/homeSlider";
import { motion } from 'framer-motion';

export async function getStaticProps() {
	let data = await fetch(`https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`).then((res) => res.json());

	if (!process.env.NODE_ENV === "development") {data = data.filter(x => x.published)}

	return { props: { posts: data } };

}

export default function Home({ posts }) {

    return (
        <>
			<SEO />

			<motion.header className="site-header"
				initial={{ opacity: 0, y: '40px', skewY: 1 }}
				animate={{ opacity: 1, y: 0, skewY: 0 }}
				transition={{ duration: 0.4, ease: 'easeOut'}}
				exit={{ opacity: 0, y: '40px', skewY: 1 }}>
					
				<h1 className="site-header-text">
					<HoverImage img="gifs/me.jpg">Siddharth</HoverImage> builds prototypes as a <HoverImage img="gifs/ux.gif">UX Engineer</HoverImage> Intern with the team at <HoverImage img="gifs/headout.gif" pos="bottom">Headout.</HoverImage> Here’s what he’s writing...
				</h1>
			</motion.header>

			<HomeSlider posts={posts} />

			<footer className="site-footer">Copyleft ©{new Date().getFullYear()}, Built on Next.js via Notion.</footer>
				
        </>
    );
}