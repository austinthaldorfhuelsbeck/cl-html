import { loadPost } from "./loadingFunctions.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await loadPost();
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
