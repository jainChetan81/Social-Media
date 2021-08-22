//api's to perform CRUD operations on the current user
export const read = async (userId, token) =>
	await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));

export const remove = async (userId, token) =>
	await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));

export const update = async (userId, token, user) =>
	await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: user,
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));

export const list = async () =>
	await fetch(`${process.env.REACT_APP_API_URL}/users`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
