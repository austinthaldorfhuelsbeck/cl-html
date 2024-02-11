import { fetchData } from "./utilities.js";

async function loadPostCategories() {
	const apiUrl = "post_categories";
	const data = await fetchData(apiUrl);
	const postCategoriesSection = document.getElementById("post-categories");
	const postLinksSection = document.getElementById("post-category-links");

	const postsNavContainer = document.createElement("div");
	postsNavContainer.className = "w-container flex-center-container aos-init aos-animate";
	postsNavContainer.setAttribute("data-aos", "fade-up");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		postsNavContainer.innerHTML += `
            <div class="${className}">
                <div class="intro-text-box">
                    <a class="title-link" href="/posts?category=${category.post_category_id}">${category.label}</a>
                    <div class="top-border _5">
                        <a class="text-link" href="/posts?category=${category.post_category_id}">${category.text}</a>
                    </div>
                </div>
            </div>`;
		const footerLink = document.createElement("a");
		footerLink.className = "footer-link-alt";
		footerLink.href = `/posts?category=${category.post_category_id}`;
		footerLink.innerHTML = `⤷${category.label}`;
		postLinksSection.appendChild(footerLink);
	});
	if (postCategoriesSection) postCategoriesSection.appendChild(postsNavContainer);
}

export { loadPostCategories };
