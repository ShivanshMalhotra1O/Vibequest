import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Returns the user data from the backend
 * @typedef {Object} User
 * @property {string} id - The user's ID
 * @property {string} name - The user's name
 * @property {string} username - The user's username
 * @returns {Promise<User>} The user data
 */
export const getUserData = async () => {
	try {
		const res = await axios.get(`${BACKEND_URL}/user`, {
			withCredentials: true,
		});
		return res.data;
	} catch {
		return null;
	}
};

export function useUser() {
	return useQuery({
		queryKey: ['user_data'],
		queryFn: getUserData,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
}

export const logOut = async () => {
	try {
		await axios.post(
			`${BACKEND_URL}/user/logout`,
			{},
			{
				withCredentials: true,
			}
		);
		window.location.reload();
	} catch {
		return null;
	}
};
