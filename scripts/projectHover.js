import anime from "animejs";
import { map, lerp, clamp, getMousePos } from "./utils";

let mousepos = { x: 0, y: 0 };
let mousePosCache = mousepos;
let direction = {
	x: mousePosCache.x - mousepos.x,
	y: mousePosCache.y - mousepos.y,
};

window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

export default class ProjectHover {
	constructor(el, index) {
		this.DOM = { el: el }; // class ".project=li"
		this.DOM.media = this.DOM.el.querySelector(".project-li-media");
		this.index = index; // number in menu
		this.animProps = {
			tx: { previous: 0, current: 0, amt: 0.08 },
			ty: { previous: 0, current: 0, amt: 0.08 },
			rotation: { previous: 0, current: 0, amt: 0.08 },
		};
		this.initEvents();
	}
	// calculate the position/size of both the menu item and reveal element
	calcBounds() {
		// crosscheck bounds with reference
		this.bounds = {
			el: this.DOM.el.getBoundingClientRect(),
			media: this.DOM.el
				.querySelector(".project-li-title")
				.getBoundingClientRect(),
		};
	}
	initEvents() {
		this.mouseenterFn = (ev) => {
			this.showImage();
			this.firstRAFCycle = true;
			this.loopRender();
		};
		this.mouseleaveFn = () => {
			this.stopRendering();
			this.hideImage();
		};

		this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
		this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
	}
	showImage() {
		anime.remove(this.DOM.media);
		anime({
			targets: this.DOM.media,
			duration: 200,
			easing: "easeOutSine",
			translateX: [direction.x < 0 ? "100%" : "-100%", 0], // check for directional movement
			begin: () => {
				anime.set(this.DOM.media, { opacity: 0.6 });
				anime.set(this.DOM.el, { zIndex: 8 });
			},
		});
	}
	hideImage() {
		anime.remove(this.DOM.media);
		anime({
			targets: this.DOM.media,
			duration: 200,
			easing: "easeOutSine",
			translateX: direction.x < 0 ? "100%" : "-100%",
			begin: () => {
				anime.set(this.DOM.el, { zIndex: 1 });
			},
			complete: () => {
				anime.set(this.DOM.media, { opacity: 0 });
			},
		});
	}
	loopRender() {
		if (!this.requestId) {
			this.requestId = requestAnimationFrame(() => this.render());
		}
	}
	stopRendering() {
		if (this.requestId) {
			window.cancelAnimationFrame(this.requestId);
			this.requestId = undefined;
		}
	}
	render() {
		this.requestId = undefined;
		if (this.firstRAFCycle) {
			this.calcBounds();
		}

		// calculate the mouse distance (current vs previous cycle)
		const mouseDistanceX = clamp(
			Math.abs(mousePosCache.x - mousepos.x),
			0,
			100
		);
		// direction where the mouse is moving
		direction = {
			x: mousePosCache.x - mousepos.x,
			y: mousePosCache.y - mousepos.y,
		};
		// updated cache values
		mousePosCache = { x: mousepos.x, y: mousepos.y };

		// new translation values
		// the center of the image element is positioned where the mouse is
		// crosscheck integrity post bounds calculations
		this.animProps.tx.current = Math.abs(
			mousepos.x - this.bounds.el.left - this.bounds.media.width / 2
		);
		this.animProps.ty.current = Math.abs(
			mousepos.y - this.bounds.el.top - this.bounds.media.height / 2
		);
		// new rotation value
		this.animProps.rotation.current = this.firstRAFCycle
			? 0
			: map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 60 : -60);

		// set up the interpolated values
		// for the first cycle, both the interpolated values need to be the same so there's no "lerped" animation between the previous and current state
		this.animProps.tx.previous = this.firstRAFCycle
			? this.animProps.tx.current
			: lerp(
					this.animProps.tx.previous,
					this.animProps.tx.current,
					this.animProps.tx.amt
			  );
		this.animProps.ty.previous = this.firstRAFCycle
			? this.animProps.ty.current
			: lerp(
					this.animProps.ty.previous,
					this.animProps.ty.current,
					this.animProps.ty.amt
			  );
		this.animProps.rotation.previous = this.firstRAFCycle
			? this.animProps.rotation.current
			: lerp(
					this.animProps.rotation.previous,
					this.animProps.rotation.current,
					this.animProps.rotation.amt
			  );

		// set styles
		anime.set(this.DOM.media, {
			translateX: this.animProps.tx.previous,
			translateY: this.animProps.ty.previous,
			rotate: this.animProps.rotation.previous,
		});

		// loop
		this.firstRAFCycle = false;
		this.loopRender();
	}
}
