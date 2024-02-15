import { fetchData } from "./utilities.js";

async function loadPostCategories() {
	const apiUrl = "post_categories";
	const data = await fetchData(apiUrl);
	const postCategoriesSection = document.getElementById("post-categories");
	const postCategoriesDropdown = document.getElementById("post-categories-dropdown");
	const postLinksSection = document.getElementById("post-category-links");

	const sectionsContainer = document.createElement("div");
	sectionsContainer.className = "w-container flex-center-container aos-init aos-animate";
	sectionsContainer.setAttribute("data-aos", "fade-up");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		const postCategoryTarget = `posts?category=${category.post_category_id}`;

		sectionsContainer.innerHTML += `
            <div class="${className}">
                <div class="intro-text-box">
                    <a class="title-link" href=${postCategoryTarget}>${category.label}</a>
                    <div class="top-border _5">
                        <a class="text-link" href=${postCategoryTarget}>${category.text}</a>
                    </div>
                </div>
            </div>`;

		const footerLink = document.createElement("a");
		footerLink.className = "footer-link-alt";
		footerLink.href = postCategoryTarget;
		footerLink.innerHTML = `⤷${category.label}`;
		postLinksSection.appendChild(footerLink);

		const navLi = document.createElement("li");
		const navLink = document.createElement("a");
		navLink.className = "dropdown-item";
		navLink.href = postCategoryTarget;
		navLink.innerHTML = category.label;
		navLi.appendChild(navLink);
		postCategoriesDropdown.appendChild(navLi);
	});
	if (postCategoriesSection) postCategoriesSection.appendChild(sectionsContainer);
}

export { loadPostCategories };
