// const emailJsUserId = "user_CvpPf1sJ7rZo6giCrFhIr";
// const emailJsServiceId = "service_wyug9ql";
// const emailJsTemplateId = "template_hwmp9zf";

// // Initialize EmailJS
// emailjs.init(emailJsUserId);

// // Function to send email
// function sendEmail() {
// 	var params = {
// 		email: document.querySelector('[name="email"]').value,
// 		name: document.querySelector('[name="name"]').value,
// 	};

// 	emailjs.send(emailJsServiceId, emailJsTemplateId, params).then(
// 		function (response) {
// 			console.log("SUCCESS!", response.status, response.text);
// 			// Optionally, inform the user about the successful subscription
// 		},
// 		function (error) {
// 			console.log("FAILED...", error);
// 			// Optionally, inform the user about the failure
// 		},
// 	);
// }

const baseURL = "http://localhost:7070";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await Promise.all([loadEventCategories(), loadFeaturedPost(), loadPostCategories(), loadPostTopics()]);
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
	const eventsNavContainer = document.getElementById("event-categories");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		const introBox = document.createElement("div");
		introBox.className = className;
		introBox.style.width = "20%";
		introBox.innerHTML = `
            <div class="intro-text-box">
                <a class="title-link" href="/events?category=${category.event_category_id}">${category.label}</a>
                <div class="top-border _5">
                    <a class="text-link" href="/events?category=${category.event_category_id}">${category.text}</a>
                </div>
            </div>`;
		eventsNavContainer.appendChild(introBox);
	});
}

async function loadPostCategories() {
	const apiUrl = "post_categories";
	const data = await fetchData(apiUrl);
	const postCategoriesSection = document.getElementById("post-categories");
	const containerDiv = document.createElement("div");
	containerDiv.className = "w-container flex-center-container aos-init aos-animate";
	containerDiv.setAttribute("data-aos", "fade-up");

	data.data.forEach((category, index) => {
		const className = ["intro-box", "intro-box-alt1", "intro-box-alt2", "intro-box-alt3"][index % 4];
		containerDiv.innerHTML += `
            <div class="${className}">
                <div class="intro-text-box">
                    <a class="title-link" href="/posts?category=${category.post_category_id}">${category.label}</a>
                    <div class="top-border _5">
                        <a class="text-link" href="/posts?category=${category.post_category_id}">${category.text}</a>
                    </div>
                </div>
            </div>`;
	});
	postCategoriesSection.appendChild(containerDiv);
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
