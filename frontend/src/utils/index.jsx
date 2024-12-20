import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Returns the user data from the backend
 * @typedef {Object} UserImage
 * @property {Buffer} data - The user's profile picture
 * @typedef {Object} User
 * @property {string} id - The user's ID
 * @property {string} name - The user's name
 * @property {string} username - The user's username
 * @property {UserImage} image - The user's profile picture
 * @property {string} joinedDate - The date the user joined the app
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

export function toBase64(arr) {
	return btoa(
		arr?.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
}
