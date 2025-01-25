import { convertCurrency } from '../src/lib/utilities.svelte';
import { expect, test } from 'vitest';

const currencies = {
	USD: '1',
	EUR: '0.85',
	JPY: '110.0',
	GBP: '0.75'
};

test('should convert USD to EUR correctly', () => {
	const result = convertCurrency(100, 'USD', 'EUR', currencies);
	expect(result).toBe(85); // 100 USD * 0.85 EUR/USD
});

test('should convert USD to USD correctly', () => {
	const result = convertCurrency(100, 'USD', 'USD', currencies);
	expect(result).toBe(100); // 100 EUR / 1 USD/USD
});

test('should convert EUR to USD correctly', () => {
	const result = convertCurrency(100, 'EUR', 'USD', currencies);
	expect(result).toBeCloseTo(117.65, 2); // 100 EUR / 0.85 EUR/USD
});

test('should convert EUR to GBP correctly', () => {
	const result = convertCurrency(100, 'EUR', 'GBP', currencies);
	expect(result).toBeCloseTo(88.24, 2); // 100 EUR / 0.85 EUR/USD * 0.75 GBP/USD
});

test('should handle invalid currency rates gracefully', () => {
	const invalidCurrencies = {
		USD: '1',
		EUR: 'invalid'
	};
	const result = convertCurrency(100, 'USD', 'EUR', invalidCurrencies);
	expect(result).toBe(0); // Should return 0 for invalid rates
});

test('should return 0 for unknown currencies', () => {
	const result = convertCurrency(100, 'XYZ', 'ABC', currencies);
	expect(result).toBe(0); // Should return 0 for unknown currencies
});

test('should round off to 2 decimal places', () => {
	const result = convertCurrency(10, 'USD', 'JPY', currencies);
	expect(result).toBeCloseTo(1100.0, 2); // 10 USD * 110 JPY/USD
});
