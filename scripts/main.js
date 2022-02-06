import "../styles/main.css";
import { animate, stagger } from "motion"
import { annotate } from 'rough-notation';

animate(
	".blog-container h1 > span > span",
	{ y: [20, 0], opacity: [0, 1] },
	{ duration: 0.3, delay: stagger(0.02) }
)


if (window.innerWidth > 720) {
	const colors = ["#59EFEF", "#4DF8D9", "#FF9AB2", "#CE9BF5"]
	let colorsCopy = colors.slice(0)

	const randomColour = () => {
		if (colorsCopy.length < 1) colorsCopy = colors.slice(0)
		const index = Math.floor(Math.random() * colorsCopy.length)
		const item = colorsCopy[index]
		colorsCopy.splice(index, 1)
		return item
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
		const linkAnn = annotate(link, { type: 'circle', iterations: 2, color: randomColour(), strokeWidth: 2, multiline: true })

		link.addEventListener('mouseenter', () => linkAnn.show())
		link.addEventListener('mouseleave', () => linkAnn.hide())
	})

	const noteBackEl = document.querySelector('.note-back')

	const noteBackAnn = annotate(noteBackEl, { type: 'circle', iterations: 2, color: randomColour(), strokeWidth: 2 })

	noteBackEl.addEventListener('mouseenter', () => noteBackAnn.show())
	noteBackEl.addEventListener('mouseleave', () => noteBackAnn.hide())

}