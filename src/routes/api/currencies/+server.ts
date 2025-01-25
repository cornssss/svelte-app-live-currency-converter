import { API_ENDPOINT, API_KEY } from '$env/static/private';
import type { FetchedData } from '$lib/types';
import { json, error } from '@sveltejs/kit';

// GET method to fetch currencies
export const GET = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}${API_KEY}`);

		if (!response.ok) {
			throw error(response.status, `Error: ${response.status} ${response.statusText}`);
		}

		const data: FetchedData = await response.json();
		return json(data);
	} catch (err: unknown) {
		console.error('Failed to fetch currencies:', err);
		throw error(500, 'Internal Server Error');
	}
};
