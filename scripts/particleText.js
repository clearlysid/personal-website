import gsap from "gsap";

const Lerp = (min, max, val) => (max - min) * val + min;

function ParticleText() {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");
	canvas.width = 540;
	canvas.height = 140;
	let color = "#222";

	let particleArray = [];

	const profile = document.getElementById("profile");

	gsap.to("#profile", {
		duration: 8,
		rotation: 360,
		repeat: Infinity,
		ease: "sine.inOut",
	});

	// handle mouse
	const mouse = { x: -100, y: -100, radius: 48 };

	canvas.addEventListener("mousemove", (e) => {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
		gsap.set("#profile", { x: e.offsetX - 40, y: e.offsetY - 40 });
	});

	canvas.addEventListener("mouseleave", (e) => {
		mouse.x = -100;
		mouse.y = -100;
		gsap.to("#profile", { scale: 0, duration: 0.2 });
		gsap.to("#canvas1", { opacity: 1, duration: 0.2 });
		color = "#222";
	});

	canvas.addEventListener("mouseenter", (e) => {
		gsap.to("#profile", { scale: 1, duration: 0.4 });
		gsap.to("#canvas1", { opacity: 0.4, duration: 0.2 });
		// color = "lightblue";
	});

	ctx.fillStyle = "black";
	ctx.font = "400 86px Anybody";
	ctx.fillText("@clearlysid", 20, 120);

	ctx.strokeRect(20, 45, 480, 100);
	const textCoordinates = ctx.getImageData(20, 45, 480, 100);

	class Particle {
		constructor(x, y) {
			this.image = profile;
			this.x = x;
			this.y = y;
			this.size = 2;
			this.baseX = this.x;
			this.baseY = this.y;
			this.density = Math.random() * 10 + 5;
		}

		draw() {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}

		update() {
			let dx = mouse.x - this.x;
			let dy = mouse.y - this.y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			let forceDirectionX = dx / distance;
			let forceDirectionY = dy / distance;
			let maxDistance = mouse.radius;
			let force = (maxDistance - distance) / maxDistance;
			let directionX = forceDirectionX * force * this.density;
			let directionY = forceDirectionY * force * this.density;

			if (distance < mouse.radius) {
				this.x -= directionX;
				this.y -= directionY;
				this.size = 1;
			} else {
				if (this.x !== this.baseX) {
					let dx = this.x - this.baseX;
					this.x -= dx / 4;
				}
				if (this.y !== this.baseY) {
					let dy = this.y - this.baseY;
					this.y -= dy / 4;
				}
				this.size = 2;
			}
		}
	}

	function init() {
		particleArray = [];

		for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
			for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
				if (
					textCoordinates.data[
						y * 4 * textCoordinates.width + x * 4 + 3
					] > 128
				) {
					let positionX = x;
					let positionY = y;
					particleArray.push(
						new Particle(positionX * 1 + 60, positionY * 1 + 20)
					);
				}
			}
		}

		// for (let i = 0; i < 3000; i++) {
		// 	let x = Math.random() * canvas.width;
		// 	let y = Math.random() * canvas.height;
		// 	particleArray.push(new Particle(x, y));
		// }
	}

	init();

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < particleArray.length; i++) {
			particleArray[i].draw();
			particleArray[i].update();
		}

		requestAnimationFrame(animate);
	}

	animate();
}

export default ParticleText;
