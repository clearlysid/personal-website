import { defineConfig } from "vite";

export default defineConfig({
	logLevel: "error",
	build: {
		outDir: "_site",
		assetsDir: "assets",
		sourcemap: true, // technically optional
		manifest: true, // need this to write script tags
		rollupOptions: {
			input: "/scripts/main.js", // overwrite default .html entry
		},
	},
});
