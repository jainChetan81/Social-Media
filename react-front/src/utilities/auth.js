import { deleteInStorage, getFromStorage, setInStorage } from "../storage/sessionStorage";

export const isAuthenticated = () => {
	if (typeof window === undefined) return false;
	if (getFromStorage("jwt") !== null) return getFromStorage("jwt");
	else return false;
};

export const signout = (next) => {
	if (typeof window !== undefined) {
		deleteInStorage("jwt");
	}
	next();
	return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
		method: "GET",
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const authenticate = (jwt, next) => {
	if (typeof window !== "undefined") {
		setInStorage("jwt", jwt);
		next();
	}
};

export const signin = (signinValues = {}) => {
	return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(signinValues),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const signup = (signupValues = {}) => {
	return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(signupValues),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
