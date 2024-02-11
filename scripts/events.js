import { getEventDescription } from "./eventDescriptions.js";
import { fetchData } from "./utilities.js";

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
	const path = window.location.pathname.split("/").pop();
	if (!path.includes("events")) return;

	const searchQuery = window.location.search;
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

export { loadEvents };
