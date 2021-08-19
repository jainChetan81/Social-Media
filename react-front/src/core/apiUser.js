export const read = (userId, token) =>
	fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));

export const remove = (userId, token) =>
	fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));

export const list = () =>
	fetch(`${process.env.REACT_APP_API_URL}/users`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
