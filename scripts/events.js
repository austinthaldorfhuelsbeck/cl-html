import loadEvents from "./loadingFunctions.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await loadEvents();
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
