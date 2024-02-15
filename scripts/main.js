import { loadEventCategories } from "./eventCategories.js";
import { loadFeaturedPost } from "./loadingFunctions.js";
import { loadPostCategories } from "./postCategories.js";
import { loadPostTopics } from "./postTopics.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await Promise.all([loadEventCategories(), loadFeaturedPost(), loadPostCategories(), loadPostTopics()]);
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
