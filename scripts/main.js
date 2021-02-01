import LocomotiveScroll from "locomotive-scroll";
import ProjectHover from "./projectHover";

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

	if (document.querySelector(".project-list") && window.innerWidth > 700) {
		document.querySelectorAll(".project-item").forEach((p, i) => {
			new ProjectHover(p, i);
		});

		const homeTitle = document.querySelector(".home-grid > h1");

		homeTitle.innerHTML = Array.from(homeTitle.innerText)
			.map((l) => `<span>${l}</span>`)
			.join("");
	}
}

init();

const navButton = document.querySelector(".nav-button");
const navMain = document.querySelector(".nav-main");

if (navButton)
	navButton.addEventListener("click", () => {
		navMain.classList.toggle("active");
	});
