import loadPost from "./loadingFunctions";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await loadPost();
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
