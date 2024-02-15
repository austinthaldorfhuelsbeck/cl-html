import loadEvents from "./loadingFunctions";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await loadEvents();
	} catch (error) {
		console.error("Error loading data:", error);
	}
});
