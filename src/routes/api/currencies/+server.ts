import { API_ENDPOINT, API_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const response = await fetch(`${API_ENDPOINT}${API_KEY}`);

	if (!response.ok) {
		throw error(response.status, `Error: ${response.status} ${response.statusText}`);
	}

	return json(await response.json());
}
