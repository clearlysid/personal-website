import { motion } from 'framer-motion';
import Layout from "../components/layout";

export default function Blog() {
	return (
		<Layout>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut"}}>
				<h1>Blog page!!!</h1>
			</motion.div>
		</Layout>
	)
}
  