export type FetchedData = {
	rates: CurrencyRates;
	base: string;
	date: string;
};

export type CurrencyRates = {
	[key: string]: string;
};
