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

let projectScroll;

// init Barba
// barba.init({
// 	transitions: [
// 		{
// 			name: "homeToProject",
// 			from: {
// 				namespace: ["home"],
// 			},
// 			to: {
// 				namespace: ["project"],
// 			},
// 			sync: true,
// 			once({ next }) {
// 				animationEnter(next.container);
// 				console.log("once");
// 			},
// 		},
// 	],
// 	views: [
// 		{
// 			namespace: "home",
// 			beforeLeave(data) {
// 				// cleanup home
// 				console.log("home cleanup");
// 			},
// 			afterEnter(data) {
// 				init();
// 			},
// 		},
// 		{
// 			namespace: "project",
// 			afterEnter(data) {
// 				init();
// 			},
// 			beforeLeave(data) {
// 				// cleanup project
// 				console.log("project cleanup");
// 			},
// 		},
// 	],
// });
