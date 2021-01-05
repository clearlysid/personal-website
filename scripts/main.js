import LocomotiveScroll from "locomotive-scroll";
import barba from "@barba/core";
import anime from "animejs";

function init() {
	if (document.querySelector(".projects-container")) {
		const scroll = new LocomotiveScroll({
			el: document.querySelector(".projects-container"),
			smooth: true,
			direction: "horizontal",
			gestureDirection: "both",
			scrollbarContainer: document.querySelector(".scrollbar"),
			smartphone: {
				smooth: false,
				direction: "vertical",
			},
		});
	}

	if (document.querySelector(".article")) {
		if (window.innerWidth > 700) {
			const scroll = new LocomotiveScroll({
				el: document.querySelector(".article"),
				smooth: true,
				direction: "vertical",
				scrollbarContainer: document.querySelector(".scrollbar"),
				lerp: 0.1,
			});
		}
	}
}

init();

const navButton = document.querySelector(".nav-button");
const navMain = document.querySelector(".nav-main");

navButton.addEventListener("click", () => {
	navMain.classList.contains("active")
		? (navButton.innerHTML = "menu")
		: (navButton.innerHTML = "close");
	navMain.classList.toggle("active");
});

// barba.init({
// 	transitions: [
// 		{
// 			name: "default",
// 			leave(data) {
// 				const done = this.async();
// 				anime({
// 					targets: data.current.container,
// 					opacity: [1, 0],
// 					duration: 300,
// 					complete: () => {
// 						done();
// 					},
// 				});
// 			},
// 			enter(data) {
// 				const done = this.async();
// 				anime({
// 					targets: data.next.container,
// 					opacity: [0, 1],
// 					duration: 300,
// 					complete: () => {
// 						init();
// 						done();
// 					},
// 				});
// 			},
// 		},
// 	],
// });
