import anime from "animejs";
import { lerp, getMousePos } from "./utilities";

// Track the mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
	constructor(el) {
		this.DOM = { el: el };

		this.bounds = this.DOM.el.getBoundingClientRect();

		this.renderedStyles = {
			tx: { previous: 0, current: 0, amt: 0.2 },
			ty: { previous: 0, current: 0, amt: 0.2 },
			scale: { previous: 1, current: 1, amt: 0.2 },
		};

		this.onMouseMoveEv = () => {
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
				mouse.x - this.bounds.width / 2;
			this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
				mouse.y - this.bounds.height / 2;

			anime({
				targets: this.DOM.el,
				duration: 900,
				easing: "easeOutCubic",
			});

			requestAnimationFrame(() => this.render());
			window.removeEventListener("mousemove", this.onMouseMoveEv);
		};
		window.addEventListener("mousemove", this.onMouseMoveEv);
	}
	enter() {
		this.renderedStyles["scale"].current = 4;
	}
	leave() {
		this.renderedStyles["scale"].current = 1;
	}
	render() {
		this.renderedStyles["tx"].current = mouse.x - this.bounds.width / 2;
		this.renderedStyles["ty"].current = mouse.y - this.bounds.height / 2;

		for (const key in this.renderedStyles) {
			this.renderedStyles[key].previous = lerp(
				this.renderedStyles[key].previous,
				this.renderedStyles[key].current,
				this.renderedStyles[key].amt
			);
		}

		this.DOM.el.style.transform = `translateX(${this.renderedStyles["tx"].previous}px) translateY(${this.renderedStyles["ty"].previous}px) scale(${this.renderedStyles["scale"].previous})`;

		requestAnimationFrame(() => this.render());
	}
}
