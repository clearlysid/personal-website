
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

	lax.addDriver('scrollY', function () {
		return window.scrollY
	})

	lax.addElements('.hm-gallery:first-of-type', {
		scrollY: {
			translateY: [
				["elInY", "elOutY"],
				[-100, 0],
			]
		}
	})

	lax.addElements('.hm-gallery:nth-of-type(2)', {
		scrollY: {
			translateY: [
				["elInY", "elOutY"],
				[200, 0],
			]
		}
	})

	lax.addElements('.hm-gallery:nth-of-type(3)', {
		scrollY: {
			translateY: [
				["elInY", "elOutY"],
				[40, 20],
			]
		}
	})

	lax.addElements('.hm-gallery:nth-of-type(4)', {
		scrollY: {
			translateY: [
				["elInY", "elOutY"],
				[100, -200],
			]
		}
	})

	lax.addElements('.hm-gallery:nth-of-type(5)', {
		scrollY: {
			translateY: [
				["elInY", "elOutY"],
				[0, 100],
			]
		}
	})
}


