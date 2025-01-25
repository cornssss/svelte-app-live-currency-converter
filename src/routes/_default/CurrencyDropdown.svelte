<script lang="ts">
	import { icons } from '../../assets';

	interface Props {
		currencyOptions: string[];
		onSelectedCurrency: (currency: string) => void;
		selectedCurrency: string;
	}

	let { currencyOptions, onSelectedCurrency, selectedCurrency }: Props = $props();

	let isOpen = $state(false);

	let inputCurrency = $state(selectedCurrency);
	let errorMessage = $derived(currencyOptions.includes(inputCurrency) ? '' : 'invalid currency');
	let displayedCurrencies: string[] = $state([]);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function onValueChanged() {
		isOpen = true;
		if (inputCurrency === '') displayedCurrencies = currencyOptions;
		else
			displayedCurrencies = currencyOptions.filter((c) =>
				c.toUpperCase().includes(inputCurrency.toUpperCase())
			);
	}

	$effect(() => {
		displayedCurrencies = currencyOptions;
	});
</script>

<div class="container">
	<div class="dropdown">
		<input type="text" class="inp" bind:value={inputCurrency} oninput={onValueChanged} />
		<button class="btn" onclick={toggleDropdown}>
			<img src={icons.arrowDown} alt="Arrow Down" class="btnIcon" />
		</button>
	</div>
	<div class="dropdown-content" class:is-open={isOpen}>
		{#each displayedCurrencies as currency}
			<a
				href="/"
				onclick={() => {
					isOpen = false;
					onSelectedCurrency(currency);
					inputCurrency = currency;
				}}>{currency}</a
			>
		{/each}
	</div>
	{#if errorMessage !== ''}
		<div class="error-message">{errorMessage}</div>
	{/if}
</div>

<!-- <a href="https://www.flaticon.com/free-icons/swap" title="swap icons">
	Swap icons created by AB Design - Flaticon
</a>
<a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons"
	>Arrow icons created by Freepik - Flaticon</a
> -->

<style>
	.container {
		position: relative;
	}
	.dropdown {
		display: inline-flex;
		align-items: center;
		background-color: var(--color-button);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
	}

	.dropdown .inp {
		text-align: center;
		font-size: 14px;
		color: var(--color-text);
		border: none;
		outline: none;
		background-color: transparent;
		width: 100px;

		text-transform: uppercase;
	}

	.dropdown .btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: var(--color-button);
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.dropdown .btn:hover {
		background-color: #e0e0e0;
	}

	.dropdown .btnIcon {
		width: 10px;
		height: 10px;
		filter: brightness(0.6);
	}

	.dropdown-content {
		position: absolute;
		display: none;
		top: 40px;
		left: 0;
		background-color: var(--color-button);
		filter: brightness(0.9);
		width: 150px;
		max-height: 200px;
		overflow-y: auto;
		z-index: 100;
	}

	.dropdown-content.is-open {
		display: block;
	}

	.dropdown-content a {
		color: var(--color-text);
		padding: 8px 12px;
		text-decoration: none;
		display: block;
	}

	.dropdown-content a:hover {
		background-color: var(--color-button-hover);
	}
	.error-message {
		color: rgb(202, 0, 0);
		font-size: 14px;
		margin-top: 5px;
	}
</style>
