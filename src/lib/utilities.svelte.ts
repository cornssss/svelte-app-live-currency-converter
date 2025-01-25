import type { CurrencyRates } from './types';

export function convertCurrency(
	amount: number,
	from: string,
	to: string,
	currencies: CurrencyRates
): number {
	const fromRate = parseFloat(currencies[from]);
	const toRate = parseFloat(currencies[to]);

	// Check if rates are valid
	if (isNaN(fromRate) || isNaN(toRate)) {
		console.warn('Invalid currency rates.', fromRate, toRate);
		return 0;
	}

	let value = 0;

	// Case 1: Base currency is USD
	if (from === 'USD') {
		value = amount * toRate;
	}

	// Case 2: Target currency is USD
	else if (to === 'USD') {
		value = amount / fromRate;
	}

	// Case 3: Both source and target currencies are different from USD
	// Convert amount to USD first, then to target currency
	else {
		const amountInUSD = amount / fromRate;
		value = amountInUSD * toRate;
	}

	const roundedValue = parseFloat(value.toFixed(2));
	return roundedValue;
}
