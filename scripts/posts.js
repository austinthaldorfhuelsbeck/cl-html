import { loadPosts } from "./loadingFunctions.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await loadPosts();
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
