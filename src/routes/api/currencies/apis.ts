// import { API_ENDPOINT, API_KEY } from '$env/static/private';
import type { FetchedData } from '$lib/types';
import { error } from '@sveltejs/kit';

const API_ENDPOINT = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=';
const API_KEY = 'd7a39e56e3d243a390472b00802d41dc';

export const fetchCurrencies = async (): Promise<FetchedData | null> => {
	try {
		const response = await fetch(`${API_ENDPOINT}${API_KEY}`);

		if (!response.ok) {
			throw error(response.status, `Error: ${response.status} ${response.statusText}`);
		}

		const data: FetchedData = await response.json();
		return data;
	} catch (err: unknown) {
		console.error('Failed to fetch currencies:', err);
		return null;
	}
};
