import { fetchData } from "./utilities.js";

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
	if (postTopicsSection) postTopicsSection.appendChild(ul);
}

export { loadPostTopics };
