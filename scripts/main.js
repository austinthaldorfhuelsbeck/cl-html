import { loadEventCategories } from "./eventCategories.js";
import { loadEvents } from "./events.js";
import { loadPostCategories } from "./postCategories.js";
import { loadPostTopics } from "./postTopics.js";
import { loadFeaturedPost, loadPost, loadPosts } from "./posts.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await Promise.all([
			loadEventCategories(),
			loadFeaturedPost(),
			loadPostCategories(),
			loadPostTopics(),
			loadPosts(),
			loadPost(),
			loadEvents(),
		]);
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
