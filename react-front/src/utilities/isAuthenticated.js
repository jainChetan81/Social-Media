import { getFromStorage } from "../storage/sessionStorage";

export const isAuthenticated = () => {
	if (typeof window === undefined) return false;
	if (getFromStorage("jwt") !== null) return getFromStorage("jwt");
	else return false;
};
