import LocomotiveScroll from "locomotive-scroll";

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

const navButton = document.querySelector(".nav-button");
const navMain = document.querySelector(".nav-main");

navButton.addEventListener("click", () => {
	navMain.classList.contains("active")
		? (navButton.innerHTML = "menu")
		: (navButton.innerHTML = "close");
	navMain.classList.toggle("active");
});
