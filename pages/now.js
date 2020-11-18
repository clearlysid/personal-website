import SEO from "@components/seo";
import { NotionRenderer } from '@components/notion';
import { motion } from 'framer-motion';

export async function getStaticProps() {
	const data = await fetch("https://notion-api.splitbee.io/v1/page/43a71af018da4387a9eaa77fc537c966").then((res) => res.json());

    return { props: { data } };
}

export default function Now({ data, date }) {

	return (
		<>
			<SEO title="Siddharth — What am I up to now?" />

			<motion.div className="page-container now notion-small-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
				<h1 className="page-title">Right now, Siddharth is...</h1>
				<NotionRenderer blockMap={data} />
			</motion.div>

			<footer className="page-footer">Copyleft ©{new Date().getFullYear()}, Built on Next.js via Notion.</footer>
		</>	
	)
}