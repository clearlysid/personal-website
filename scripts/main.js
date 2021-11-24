import "../styles/main.css";
import { animate, stagger } from "motion"

animate(
	".blog-container h1 > span",
	{ y: [20, 0], opacity: [0, 1] },
	{ duration: 0.3, delay: stagger(0.02) }
)