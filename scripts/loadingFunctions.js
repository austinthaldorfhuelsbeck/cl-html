import { getEventDescription } from "./eventDescriptions.js";
import { fetchData } from "./utilities.js";

function getDetailUrl() {
	const searchParams = new URLSearchParams(window.location.search);
	const postId = searchParams.get("id");
	const topicId = searchParams.get("topic");
	const categoryId = searchParams.get("category");

	if (postId) return `posts/${postId}`;
	if (topicId) return `post_topics/${topicId}`;
	if (categoryId) return `post_categories/${categoryId}`;
	return null;
}

function createPostElement(post, topic) {
	const postElement = document.createElement("a");
	postElement.className = "grow";
	postElement.href = `/cl-html/post?id=${post.post_id}`;
	const displayText = post.text.length > 250 ? `${post.text.slice(0, 250)}...` : post.text;
	postElement.innerHTML = `
        <div class="card aos-init aos-animate" data-aos="fade">
            <img src="${post.img || "/cl-html/img/Abstract-1.jpg"}" class="card-img-top" alt="${post.label}" />
            <div class="topic-banner" style="background-color: ${topic ? topic.hex : "#ddd"}"></div>
            <div class="card-body">
                <h3 class="card-title">${post.label}</h3>
                <p class="card-text text-link-3">${displayText}</p>
            </div>
        </div>
    `;
	return postElement;
}

async function loadPosts() {
	const detailUrl = getDetailUrl();
	const postsRes = await fetchData(`posts${window.location.search}`);
	const postTopicsRes = await fetchData("post_topics");

	if (detailUrl) {
		const detailResponse = await fetchData(detailUrl);
		document.getElementById("post-header").textContent = detailResponse.data.label;
		document.getElementById("back-to-posts").textContent = "← Back to all posts";
	}

	const postsList = document.getElementById("posts-list");
	postsRes.data.forEach((post) => {
		const topic = postTopicsRes.data.find((pt) => pt.post_topic_id === post.post_topic_id);
		const postElement = createPostElement(post, topic);
		postsList.appendChild(postElement);
	});
}

async function loadPost() {
	const detailUrl = getDetailUrl();
	if (detailUrl) {
		const detailResponse = await fetchData(detailUrl);
		if (detailResponse) {
			document.getElementById("back-to-posts").textContent = "← Back to all posts";

			const post = detailResponse.data;

			const topicRes = await fetchData(`post_topics/${post.post_topic_id}`);
			const postDetailSection = document.getElementById("post-full-detail");
			postDetailSection.innerHTML = `
                <h1>${post.label}</h1>
                <div class="col-3">
                    <a class="white-text" href="/cl-html/posts?topic=${post.post_topic_id}" style="background-color: ${topicRes.data.hex}">
                        <em>← Back to topic</em>
                    </a>
                    <h5>Published on ${new Date(post.created_at).toLocaleDateString()}</h5>
                </div>
                <div class="row">
                    <a target="_blank" rel="noreferrer" href="${post.url}">
                        <img class="image-blog" src="${post.img}" alt="${post.label}">
                    </a>
                    ${
						post.audio
							? `<aside class="center-box">
							<audio preload="none" controls>
								<source type="audio/mpeg" src="${post.audio}">
							</audio>
							<br>
							<br>
							<a class="button" href="${post.audio}" target="_blank" download rel="noreferrer">Download</a>
						</aside>`
							: ""
					}
                </div>
                <div>${post.content}</div>
				${post.video ? `<video src=${post.video} />` : ""}
				${
					post.audio || post.video
						? ""
						: `<img
							src="../cl-html/img/cathy-loerzel-signature.png"
							alt="Cathy Loerzel"
							class="signature"
						/>`
				}
            `;
		}
	}
}

async function loadFeaturedPost() {
	const data = await fetchData("posts/featured");
	const featuredPostSection = document.getElementById("featured-post");
	if (!featuredPostSection || !data.data) return;

	const { img, label, post_id } = data.data;
	featuredPostSection.innerHTML = `
        <h1 class="featured-blog-header">Featured Post</h1>
        <a class="text-img-container" href="/cl-html/post?id=${post_id}">
            <img class="image shadow featured-image" src="${img}" alt="${label}" />
            <p class="title-link featured-text">${label}</p>
        </a>
    `;
}

async function loadEventDetails(categoryId, events) {
	const detailUrl = `event_categories/${categoryId}`;
	const detailResponse = await fetchData(detailUrl);

	const eventCategoryHeader = document.getElementById("event-header");
	const eventCategorySubheader = document.getElementById("event-subheader");
	const eventCategoryDesc = document.getElementById("event-category-desc");
	const backToEvents = document.getElementById("back-to-events");

	// Set header, subheader, and description based on fetched details
	eventCategoryHeader.textContent = detailResponse.data.label;
	eventCategorySubheader.innerHTML = events.length > 0 ? `Upcoming ${detailResponse.data.label}` : "";
	eventCategoryDesc.innerHTML = getEventDescription(categoryId);
	backToEvents.textContent = "← Back to all events";
}

async function displayEvents(events) {
	const eventsList = document.getElementById("events-list");
	events.forEach((event) => {
		const eventElement = document.createElement("li");
		eventElement.className = "grow";
		eventElement.innerHTML = `
            <div class="accordion accordion-flush" id="${event.event_id}">
                <div class="accordion-item">
                    <h2 class="card-title" id="heading-${event.event_id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${event.event_id}" aria-expanded="false" aria-controls="collapse-${event.event_id}">
                            ${event.label} | ${new Date(event.date).toDateString()}
                        </button>
                    </h2>
                    <div id="collapse-${event.event_id}" class="accordion-collapse collapse" aria-labelledby="heading-${event.event_id}" data-bs-parent="#${event.event_id}">
                        <div class="accordion-body">${event.content}</div>
                    </div>
                </div>
            </div>
        `;
		eventsList.appendChild(eventElement);
	});
}

async function loadEvents() {
	const searchQuery = window.location.search;
	console.log("Loading events", searchQuery);
	const eventsRes = await fetchData(`events${searchQuery}`);

	// Filter only upcoming events
	const upcomingEvents = eventsRes.data.filter((e) => new Date(e.date) > new Date());

	// Display category-specific information if a category is specified
	const categoryId = new URLSearchParams(searchQuery).get("category");
	if (categoryId) {
		await loadEventDetails(categoryId, upcomingEvents);
	}

	displayEvents(upcomingEvents);
}

export { loadEvents, loadFeaturedPost, loadPost, loadPosts };
