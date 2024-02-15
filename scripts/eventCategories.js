import { fetchData } from "./utilities.js";

async function loadEventCategories() {
	const apiUrl = "event_categories";
	const data = await fetchData(apiUrl);
	const eventCategoriesSection = document.getElementById("event-categories");
	const eventCategoriesDropdown = document.getElementById("event-categories-dropdown");
	const eventLinksSection = document.getElementById("event-category-links");

	const sectionsContainer = document.createElement("div");
	sectionsContainer.className = "w-container flex-center-container aos-init aos-animate";
	sectionsContainer.setAttribute("data-aos", "fade-up");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		sectionsContainer.innerHTML += `
			<div class="${className}" style="width: 20%">
				<div class="intro-text-box">
					<a class="title-link" href="/cl-htmlevents?category=${category.event_category_id}">${category.label}</a>
					<div class="top-border _5">
						<a class="text-link" href="/cl-htmlevents?category=${category.event_category_id}">${category.text}</a>
					</div>
				</div>
			</div>`;

		const eventCategoryTarget = `/events?category=${category.event_category_id}`;

		const footerLink = document.createElement("a");
		footerLink.className = "footer-link-alt";
		footerLink.href = eventCategoryTarget;
		footerLink.innerHTML = `⤷${category.label}`;
		eventLinksSection.appendChild(footerLink);

		const navLi = document.createElement("li");
		const navLink = document.createElement("a");
		navLink.className = "dropdown-item";
		navLink.href = eventCategoryTarget;
		navLink.innerHTML = category.label;
		navLi.appendChild(navLink);
		eventCategoriesDropdown.appendChild(navLi);
	});
	eventCategoriesSection.appendChild(sectionsContainer);
}

export { loadEventCategories };
