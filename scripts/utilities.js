async function fetchData(apiPath) {
	const response = await fetch(`http://localhost:7070/${apiPath}`);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json();
}

export { fetchData };
