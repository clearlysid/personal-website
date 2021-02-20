import LocomotiveScroll from "locomotive-scroll";
import ProjectHover from "./projectHover";
import Cursor from "./cursor";
import { getIsMobile } from "./utilities";
import barba from "@barba/core";
import anime from "animejs";

const isMobile = getIsMobile();

let scroll;

function renderCursor() {
	const cursor = document.createElement("div");
	cursor.id = "cursor";
	document.body.appendChild(cursor);
	const animCursor = new Cursor(cursor);
}

function init() {
	if (document.querySelector(".article") && !isMobile) {
		scroll = new LocomotiveScroll({
			el: document.querySelector(".article"),
			smooth: true,
			direction: "vertical",
			scrollbarContainer: document.querySelector(".scrollbar"),
			lerp: 0.1,
		});
	}

	if (document.querySelector(".project") && !isMobile) {
		scroll = new LocomotiveScroll({
			el: document.querySelector(".project"),
			smooth: true,
			direction: "vertical",
			scrollbarContainer: document.querySelector(".scrollbar"),
			lerp: 0.1,
		});
	}

	if (!isMobile) {
		document
			.querySelectorAll(".project-item")
			.forEach((p) => new ProjectHover(p));
	}
}

init();

const navButton = document.querySelector(".nav-button");
const navMain = document.querySelector(".nav-main");

if (navButton)
	navButton.addEventListener("click", () => {
		navMain.classList.toggle("active");
	});

if (!isMobile) renderCursor();

const animationEnter = (container) => {
	return anime({
		targets: container,
		opacity: [0, 1],
		duration: 2000,
	});
};

const animationLeave = (container, done) => {
	return anime({
		targets: container,
		opacity: [1, 0],
		duration: 2000,
		complete: () => {
			done();
		},
	});
};

let obb;
let ibb;

// init Barba
barba.init({
	transitions: [
		{
			name: "homeToProject",
			from: {
				namespace: ["home"],
			},
			to: {
				namespace: ["project"],
			},
			sync: true,
			once({ next }) {
				animationEnter(next.container);
				console.log("once");
			},
			leave(data) {
				obb = data.trigger
					.querySelector(".project-item-media")
					.getBoundingClientRect();
				const projectImage = document.querySelector(".project-image");
				ibb = projectImage.getBoundingClientRect();
				console.log(ibb);

				const done = this.async();

				const scaleX = ibb.width / obb.width;
				const scaleY = ibb.height / obb.height;
				const posX = Math.abs(obb.x - ibb.x);
				const posY = Math.abs(obb.y - ibb.y);

				console.log(scaleX, scaleY, posX, posY);

				anime({
					targets: data.trigger.querySelector(".project-item-media"),
					top: ibb.y,
					scaleX: scaleX,
					scaleY: scaleY,
					duration: 1000,
					easing: "easeOutQuad",
					complete: () => {
						done();
						anime.remove(".project-item-media");
					},
				});
				// animationLeave(data.current.container, done);
			},
			enter(data) {
				// console.log(obb);
				// const projectImage = document.querySelector(".project-image");
				// ibb = projectImage.getBoundingClientRect();
				// console.log(ibb);

				// anime({
				// 	targets: ".project-image",
				// 	translateX: [`${posX}px`, "0px"],
				// 	translateY: [`${posY}px`, "0px"],
				// 	scaleX: [scaleX, 1],
				// 	scaleY: [scaleY, 1],
				// 	duration: 1000,
				// 	easing: "easeOutQuad",
				// 	complete: () => {
				// 		anime.remove(".project-image");
				// 		scroll.update();
				// 	},
				// });
				// animationEnter(data.next.container);
				console.log("entering");
			},
			afterEnter(data) {
				init();
			},
		},
	],
	views: [
		{
			namespace: "home",
			beforeLeave(data) {
				// cleanup home
				console.log("cleanup home scripts here");
				scroll.destroy();
			},
			afterEnter(data) {
				init();
			},
		},
		{
			namespace: "project",
			beforeLeave(data) {
				// cleanup project
				console.log("cleanup project scripts here");
				scroll.destroy();
			},
		},
	],
});
