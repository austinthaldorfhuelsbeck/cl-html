const baseURL = "http://localhost:7070";
// const emailJsUserId = "user_CvpPf1sJ7rZo6giCrFhIr";
// const emailJsServiceId = "service_wyug9ql";
// const emailJsTemplateId = "template_hwmp9zf";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await Promise.all([
			loadEventCategories(),
			loadFeaturedPost(),
			loadPostCategories(),
			loadPostTopics(),
			loadPosts(),
		]);
	} catch (error) {
		console.error("Error loading data:", error);
	}
});

async function fetchData(apiPath) {
	const response = await fetch(`${baseURL}/${apiPath}`);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json();
}

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
	postCategoriesSection.appendChild(postsNavContainer);
}

async function loadFeaturedPost() {
	const apiUrl = "posts/featured";
	const data = await fetchData(apiUrl);
	const featuredPost = data.data;
	const featuredPostSection = document.getElementById("featured-post");

	featuredPostSection.innerHTML = `
        <h1 class="featured-blog-header">Featured Post</h1>
        <a class="text-img-container" href="/posts/${featuredPost.post_id}">
            <img
                class="image shadow featured-image"
                src="${featuredPost.img}"
                alt="Featured Post - ${featuredPost.label}"
            />
            <div class="title-link featured-text"><p>${featuredPost.label}</p></div>
        </a>`;
}

async function loadPostTopics() {
	const apiUrl = "post_topics";
	const data = await fetchData(apiUrl);
	const postTopicsSection = document.getElementById("post-topics");
	const ul = document.createElement("ul");
	ul.className = "category-thumbnails flex-center-container aos-init aos-animate";

	data.data.forEach((topic) => {
		ul.innerHTML += `
            <li class="category-item" data-aos="fade-up">
                <a href="/posts?topic=${topic.post_topic_id}">
                    <div class="circle-color" style="background-color:${topic.hex};"></div>
                    <h4 class="over-img">${topic.label}</h4>
                </a>
            </li>`;
	});
	postTopicsSection.appendChild(ul);
}

async function loadPosts() {
	// Extract the search query from the window's location
	const searchQuery = window.location.search; // Includes the '?' followed by query parameters if any

	// Determine whether we're dealing with a topic or category from the search query
	let apiUrl = "posts"; // Default to the general posts endpoint
	let detailUrl; // This will be used to fetch additional details based on topic or category
	let detailResponse;

	if (searchQuery.includes("topic=")) {
		const topicId = new URLSearchParams(searchQuery).get("topic");
		detailUrl = `post_topics/${topicId}`;
	} else if (searchQuery.includes("category=")) {
		const categoryId = new URLSearchParams(searchQuery).get("category");
		detailUrl = `post_categories/${categoryId}`;
	}

	// Fetch posts and post topics
	const postsRes = await fetchData(`${apiUrl}${searchQuery}`);
	const postTopicsRes = await fetchData("post_topics");
	// If detailUrl is set, fetch additional details
	if (detailUrl) {
		detailResponse = await fetchData(detailUrl);
		// Update the post-header with the label from the detail response
		document.getElementById("post-header").innerHTML = detailResponse.data.label;
		document.getElementById("back-to-posts").innerHTML = "← Back to all posts";
	}

	// Continue with loading posts into the DOM as before
	const postsList = document.getElementById("posts-list");

	postsRes.data.forEach((post) => {
		const postElement = document.createElement("a");
		postElement.setAttribute("class", "grow");
		postElement.setAttribute("href", post.url);

		// Assuming postTopicsRes is available globally or fetched earlier if needed
		const topic = postTopicsRes.data.find((pt) => pt.post_topic_id === post.post_topic_id);

		// Check if post.text is longer than 250 characters
		let displayText = post.text.length > 250 ? post.text.slice(0, 250) + "..." : post.text;

		postElement.innerHTML = `
            <div class="card aos-init aos-animate" data-aos="fade">
                <img
                    src="${post.img || "/img/Abstract-1.jpg"}"
                    class="card-img-top"
                    alt="${post.label}"
                />
                <div class="topic-banner" style="background-color: ${topic ? topic.hex : "#ddd"}"></div>
                <div class="card-body">
                    <h3 class="card-title">${post.label}</h3>
                    <p class="card-text text-link-3">${displayText}</p>
                </div>
            </div>
        `;
		postsList.appendChild(postElement);
	});
}
