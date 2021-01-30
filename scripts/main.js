import LocomotiveScroll from "locomotive-scroll";
import anime from "animejs";

function init() {
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

// navButton.addEventListener("click", () => {
// 	navMain.classList.contains("active")
// 		? (navButton.innerHTML = "menu")
// 		: (navButton.innerHTML = "close");
// 	navMain.classList.toggle("active");
// });
