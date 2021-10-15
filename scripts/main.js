import "../styles/main.scss";
import { animate, stagger, timeline } from "motion"
import splt from "spltjs"

splt({})

animate(
	".blog-container h1 > .char",
	{ y: [20, 0], opacity: [0, 1] },
	{ duration: 0.3, delay: stagger(0.02) }
)