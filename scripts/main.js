import "../styles/main.css";
import { animate, stagger } from "motion"
import { annotate } from 'rough-notation';

animate(
	".blog-container h1 > span",
	{ y: [20, 0], opacity: [0, 1] },
	{ duration: 0.3, delay: stagger(0.02) }
)

const colors = ["#59EFEF", "#4DF8D9", "#FF9AB2", "#CE9BF5"]
let copy = colors.slice(0);

function randomColour() {
	if (copy.length < 1) { copy = colors.slice(0); }
	let index = Math.floor(Math.random() * copy.length);
	let item = copy[index];
	copy.splice(index, 1);
	return item;
}

document.querySelectorAll('.blog-item-title').forEach(blog => {
	const blogAnnotation = annotate(blog, {
		type: 'highlight',
		animationDuration: 600,
		color: randomColour(),
		iterations: 2
	})

	blog.addEventListener('mouseenter', () => blogAnnotation.show())
	blog.addEventListener('mouseleave', () => blogAnnotation.hide())
})


document.querySelectorAll('p > a').forEach(link => {
	const linkAnn = annotate(link, { type: 'circle', iterations: 2, color: randomColour(), strokeWidth: 2 })

	link.addEventListener('mouseenter', () => linkAnn.show())
	link.addEventListener('mouseleave', () => linkAnn.hide())
})