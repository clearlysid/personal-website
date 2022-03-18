import "../styles/main.css";
import { annotate } from 'rough-notation';


const isDesktop = window.innerWidth >= 768


if (isDesktop) {
	const colors = ["#59EFEF", "#4DF8D9", "#FF9AB2", "#CE9BF5"]
	let colorsCopy = colors.slice(0)

	const randomColour = () => {
		if (colorsCopy.length < 1) colorsCopy = colors.slice(0)
		const index = Math.floor(Math.random() * colorsCopy.length)
		const item = colorsCopy[index]
		colorsCopy.splice(index, 1)
		return item
	}

	document.querySelectorAll('.blg-item-title').forEach(title => {
		const blogAnn = annotate(title, {
			type: 'highlight',
			animationDuration: 600,
			color: randomColour(),
			iterations: 2
		})

		title.addEventListener('mouseenter', () => blogAnn.show())
		title.addEventListener('mouseleave', () => blogAnn.hide())
	})


	document.querySelectorAll('p > a').forEach(link => {
		const linkAnn = annotate(link, { type: 'circle', iterations: 2, color: randomColour(), strokeWidth: 2, multiline: true })

		link.addEventListener('mouseenter', () => linkAnn.show())
		link.addEventListener('mouseleave', () => linkAnn.hide())
	})

	const backButtonEl = document.querySelector('.back-button')

	const backButtonAnn = annotate(backButtonEl, { type: 'circle', iterations: 2, color: randomColour(), strokeWidth: 2 })

	backButtonEl.addEventListener('mouseenter', () => backButtonAnn.show())
	backButtonEl.addEventListener('mouseleave', () => backButtonAnn.hide())

}