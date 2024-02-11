import { fetchData } from "./utilities.js";

async function loadEventCategories() {
	const apiUrl = "event_categories";
	const data = await fetchData(apiUrl);
	const eventCategoriesSection = document.getElementById("event-categories");
	const eventLinksSection = document.getElementById("event-category-links");

	const eventsNavContainer = document.createElement("div");
	eventsNavContainer.className = "w-container flex-center-container aos-init aos-animate";
	eventsNavContainer.setAttribute("data-aos", "fade-up");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		eventsNavContainer.innerHTML += `
			<div class="${className}" style="width: 20%">
				<div class="intro-text-box">
					<a class="title-link" href="/events?category=${category.event_category_id}">${category.label}</a>
					<div class="top-border _5">
						<a class="text-link" href="/events?category=${category.event_category_id}">${category.text}</a>
					</div>
				</div>
			</div>`;
		const footerLink = document.createElement("a");
		footerLink.className = "footer-link-alt";
		footerLink.href = `/events?category=${category.event_category_id}`;
		footerLink.innerHTML = `⤷${category.label}`;
		eventLinksSection.appendChild(footerLink);
	});
	eventCategoriesSection.appendChild(eventsNavContainer);
}

export { loadEventCategories };
