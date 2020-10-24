import SEO from "../components/seo";
import { NotionRenderer } from '../components/notion';
import { motion } from 'framer-motion';
import Layout from "../components/layout";

export async function getStaticProps() {
	// const data = await fetch("https://notion-api.splitbee.io/v1/page/55c36a3560b64246aab297197139616b").then((res) => res.json());
	const data = await fetch("https://notion-api.splitbee.io/v1/page/43a71af018da4387a9eaa77fc537c966").then((res) => res.json());
	
    return { props: { blockMap: data } };
}

export default function Now({ blockMap }) {
	return (
		<>
			<SEO title="Now" />

			<Layout>
				<motion.div className="notion-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut"}}>
					<h1>What am I up to now?</h1>
					<NotionRenderer blockMap={blockMap} />
				</motion.div>
			</Layout>
		</>	
	)
}