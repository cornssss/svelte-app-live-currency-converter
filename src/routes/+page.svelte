<script lang="ts">
	import type { CurrencyRates, FetchedData } from '../lib/types';
	import CurrencyDropdown from './_default/CurrencyDropdown.svelte';
	import { convertCurrency } from '../lib/utilities.svelte';

	const endpoint = import.meta.env.VITE_API_ENDPOINT;
	const apiKey = import.meta.env.VITE_API_KEY;

	let isLoadingCurrencies: boolean = $state(false);
	let currencies: CurrencyRates = $state({});
	let currencyOptions: string[] = $derived(Object.keys(currencies).sort());
	let selectedCurrencyFrom: string = $state('Select');
	let selectedCurrencyTo: string = $state('Select');
	let amount: number = $state(0);
	let value: number = $derived(
		convertCurrency(amount, selectedCurrencyFrom, selectedCurrencyTo, currencies)
	);

	$effect(() => {
		const fetchCurrencies = async () => {
			try {
				isLoadingCurrencies = true;
				const response = await fetch(`${endpoint}${apiKey}`);

				if (!response.ok) {
					throw new Error(`Error: ${response.status} ${response.statusText}`);
				}

				const data: FetchedData = await response.json();

				currencies = data.rates;
			} catch (error) {
				console.error('Failed to fetch currencies:', error);
			} finally {
				isLoadingCurrencies = false;
			}
		};

		//Fetch Initially
		fetchCurrencies();

		//Fetch every 5 minutes
		const id = setInterval(fetchCurrencies, 300000, () => fetchCurrencies());
		return () => clearInterval(id);
	});
</script>

<h1 class="center">Currency Converter</h1>
<h3 class="center">powered with <strong>Svelte</strong></h3>
{#if isLoadingCurrencies}
	<div class="center"><span>loading currencies...</span></div>
{/if}
<div class="table">
	<div class="row">
		<span class="label">Amount:</span>
		<input class="input" type="number" placeholder="Enter Amount" bind:value={amount} />
	</div>
	<div class="row">
		<span class="label">Convert from:</span>
		<!-- Dropdown for the first currency -->
		<CurrencyDropdown
			{currencyOptions}
			onSelectedCurrency={(t) => (selectedCurrencyFrom = t)}
			selectedCurrency={selectedCurrencyFrom}
		/>
	</div>
	<div class="row">
		<span class="label">Convert to:</span>
		<!-- Dropdown for the last currency -->
		<CurrencyDropdown
			{currencyOptions}
			onSelectedCurrency={(t) => (selectedCurrencyTo = t)}
			selectedCurrency={selectedCurrencyTo}
		/>
	</div>
	<div class="row">
		<span class="label">Value:</span>
		<div class="value"><span>{value}</span></div>
	</div>
</div>

<style>
	.center {
		text-align: center;
	}

	.table {
		border: rgb(126, 126, 126) 1px solid;
		max-width: 300px;
		margin: auto;
		padding: 30px;
		border-radius: 4px;
		margin-top: 20px;
	}

	.row {
		margin-top: 10px;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.input {
		width: 200px;
		margin-left: 10px;
		height: 40px;
		border: none;
		outline: none;
		padding: 0px 10px;
		box-shadow: var(--shadow-sm);
		border: solid 1px #999999;
	}
	.value {
		width: 200px;
		margin-left: 10px;
		height: 40px;
		border: none;
		outline: none;
		box-shadow: var(--shadow-sm);
		background-color: aliceblue;
		text-align: center;
		align-content: center;
	}
</style>
