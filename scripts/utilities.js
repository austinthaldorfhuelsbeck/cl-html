async function fetchData(apiPath) {
	const response = await fetch(`https://website-builder-server-6b518a81afd2.herokuapp.com/api/v1/${apiPath}`);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json();
}

export { fetchData };
