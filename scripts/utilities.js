async function fetchData(apiPath) {
	const response = await fetch(`https://website-builder-server-lac.vercel.app/${apiPath}`);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json();
}

export { fetchData };
