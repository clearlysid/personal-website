import { annotate } from "rough-notation"
import lax from 'lax.js'

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
}

window.onload = function () {
	lax.init()
	lax.addDriver('scrollY', () => window.scrollY)

	document.querySelectorAll('.hm-gallery').forEach((el, i) => {
		let offset = [0, 0]

		switch (i) {
			case 0:
				offset = [-100, 0]
				break
			case 1:
				offset = [200, 0]
				break
			case 2:
				offset = [40, 20]
				break
			case 3:
				offset = [100, -200]
				break
			case 4:
				offset = [0, 100]
				break
		}

		lax.addElements(`.hm-gallery:nth-of-type(${i + 1})`, {
			scrollY: { translateY: [["elInY", "elOutY"], offset] }
		})

	})

	document.querySelector('.isLoading').classList.remove('isLoading')
}


