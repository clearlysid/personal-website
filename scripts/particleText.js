import gsap from "gsap";

const logoB64 =
	"data:image/png;base64,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";

function ParticleText() {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");

	let size = 540;
	const aRatio = 0.26;

	canvas.width = size;
	canvas.height = Math.floor(canvas.width * aRatio);

	const color = "#222";
	let particleArray = [];
	const png = new Image();
	png.src = logoB64;

	gsap.to("#profile", {
		duration: 8,
		rotation: 360,
		repeat: Infinity,
		ease: "sine.inOut",
	});

	// handle mouse events
	const mouse = { x: -100, y: -100, radius: Math.floor(size * 0.089) };

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
	});

	canvas.addEventListener("mouseenter", (e) => {
		gsap.to("#profile", { scale: 1, duration: 0.4 });
		gsap.to("#canvas1", { opacity: 0.4, duration: 0.2 });
	});

	function renderCanvasOnLogoLoad(x, y, w, h) {
		const data = ctx.getImageData(x, y, w, h);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		class Particle {
			constructor(x, y) {
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

		function initParticles() {
			particleArray = [];

			for (let y = 0, y2 = data.height; y < y2; y++) {
				for (let x = 0, x2 = data.width; x < x2; x++) {
					if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
						let positionX = x;
						let positionY = y;
						particleArray.push(
							new Particle(
								positionX * 1 + Math.floor(size * 0.088),
								positionY * 1 + Math.floor(size * 0.055)
							)
						);
					}
				}
			}
		}

		function animParticles() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < particleArray.length; i++) {
				particleArray[i].draw();
				particleArray[i].update();
			}

			requestAnimationFrame(animParticles);
		}

		initParticles();
		animParticles();
	}

	function initCanvas() {
		size = Math.max(Math.min(window.innerWidth * 0.5, 540), 200);
		canvas.width = size;
		canvas.height = Math.floor(canvas.width * aRatio);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(
			png,
			Math.floor(size * 0.088), // x
			Math.floor(size * 0.055), // y
			Math.floor(size * 0.77), // w
			Math.floor(size * 0.16) // h
		); // actual source: 420x86

		// Bounding box for reference
		// ctx.strokeRect(
		// 	Math.floor(size * 0.08), // x
		// 	Math.floor(size * 0.05), // y
		// 	Math.floor(size * 0.78), // w
		// 	Math.floor(size * 0.17) // h
		// );
		renderCanvasOnLogoLoad(
			Math.floor(size * 0.08), // x
			Math.floor(size * 0.05), // y
			Math.floor(size * 0.78), // w
			Math.floor(size * 0.17) // h
		);
	}

	window.addEventListener("load", () => initCanvas());
	// window.addEventListener("resize", () => initCanvas()); // very heavy on cpu
}

export default ParticleText;
