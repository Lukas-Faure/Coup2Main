<script lang="ts">
	import { fly } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { debounce } from '$lib/utils/debounce';
	import type { SuggestionItem } from '$lib/types/components';
	import type { Component } from 'svelte';

	let {
		value = $bindable(''),
		disabled = false,
		class: className = '',
		onSelect,
		onInput,
		placeholder = '',
		icon = undefined,
		loadSuggestions = undefined,
		staticSuggestions = [],
		showOnFocus = true,
		allowCustom = true,
		validationClasses = '',
		inputClass = '',
	}: {
		value: string;
		disabled?: boolean;
		class?: string;
		onSelect: (item: SuggestionItem) => void;
		onInput: (value: string) => void;
		placeholder?: string;
		icon?: Component;
		loadSuggestions?: (query: string) => Promise<SuggestionItem[]> | SuggestionItem[];
		staticSuggestions?: SuggestionItem[];
		showOnFocus?: boolean;
		allowCustom?: boolean;
		validationClasses?: string;
		inputClass?: string;
	} = $props();

	let suggestions: SuggestionItem[] = $state([]);
	let showDropdown = $state(false);
	let loading = $state(false);
	let activeIndex = $state(-1);
	let inputElement: HTMLInputElement;

	const MIN_QUERY_LENGTH = 1;
	const DEBOUNCE_MS = 300;
	const MAX_SUGGESTIONS = 10;

	const debouncedLoadSuggestions = loadSuggestions
		? debounce(async (query: string) => {
				if (query.length >= MIN_QUERY_LENGTH) {
					loading = true;
					try {
						const results = await loadSuggestions(query);
						suggestions = results.slice(0, MAX_SUGGESTIONS);
						showDropdown = suggestions.length > 0;
					} catch (error) {
						console.error('Erreur lors du chargement des suggestions:', error);
						suggestions = [];
					} finally {
						loading = false;
					}
				} else {
					suggestions = [];
					showDropdown = false;
				}
		  }, DEBOUNCE_MS)
		: null;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		onInput(target.value);
		activeIndex = -1;

		if (staticSuggestions.length > 0) {
			const filtered = staticSuggestions.filter(
				(item) =>
					item.label.toLowerCase().includes(value.toLowerCase()) ||
					(item.description && item.description.toLowerCase().includes(value.toLowerCase()))
			);
			suggestions = filtered.slice(0, MAX_SUGGESTIONS);
			showDropdown = suggestions.length > 0 && value.length >= MIN_QUERY_LENGTH;
		} else if (loadSuggestions) {
			debouncedLoadSuggestions && debouncedLoadSuggestions(value);
		}
	}

	function handleFocus() {
		if (showOnFocus && value.length >= MIN_QUERY_LENGTH) {
			if (staticSuggestions.length > 0) {
				suggestions = staticSuggestions.slice(0, MAX_SUGGESTIONS);
				showDropdown = true;
			} else if (loadSuggestions) {
				debouncedLoadSuggestions && debouncedLoadSuggestions(value);
			}
		} else if (showOnFocus && value.length === 0 && staticSuggestions.length > 0) {
			suggestions = staticSuggestions.slice(0, MAX_SUGGESTIONS);
			showDropdown = true;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showDropdown) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				activeIndex = Math.min(activeIndex + 1, suggestions.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = Math.max(activeIndex - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (activeIndex >= 0 && suggestions[activeIndex]) {
					selectSuggestion(activeIndex);
				} else if (allowCustom && value.trim()) {
					onSelect({ label: value.trim(), value: value.trim() });
					hideSuggestions();
				}
				break;
			case 'Escape':
				hideSuggestions();
				inputElement.blur();
				break;
		}
	}

	function selectSuggestion(index: number) {
		const suggestion = suggestions[index];
		if (suggestion) {
			value = suggestion.value || suggestion.label;
			hideSuggestions();

			onSelect(suggestion);
		}
	}

	function hideSuggestions() {
		showDropdown = false;
		activeIndex = -1;
	}

	function getSuggestionClasses(index: number) {
		return `w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-start space-x-3 ${
			index === activeIndex ? 'bg-primary-50 dark:bg-primary-900/20' : ''
		}`;
	}
</script>

<div class="relative {className}">
	<div class="relative">
		{#if icon}
			<div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
					{#if icon}
					{@const IconComponent = icon}
					<IconComponent class="w-5 h-5" />	
				{/if}
			</div>
		{/if}

		<input
			bind:this={inputElement}
			type="text"
			bind:value
			oninput={handleInput}
			onfocus={handleFocus}
			onkeydown={handleKeydown}
			{placeholder}
			{disabled}
			class="w-full {icon ? 'pl-12' : 'pl-4'} pr-4 py-3 text-base md:text-lg bg-gray-50/80 dark:bg-gray-700/80 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 {validationClasses} {inputClass} text-gray-900 dark:text-gray-100"
		/>

		{#if loading}
			<div class="absolute right-4 top-1/2 -translate-y-1/2">
				<div
					class="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
				>
				</div>
			</div>
		{/if}
	</div>

	{#if showDropdown && suggestions.length > 0}
		<div
			class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl overflow-hidden z-50"
			use:clickOutside={hideSuggestions}
			transition:fly={{ y: -5, duration: 200 }}
		>
			<ul class="max-h-60 overflow-y-auto">
				{#each suggestions as suggestion, index}
					<li>
						<button type="button" onclick={() => selectSuggestion(index)} class={getSuggestionClasses(index)}>
							{#if suggestion.icon}
								{@const IconComponent = suggestion.icon}
								<IconComponent class="w-4 h-4 text-primary-500" />			
							{/if}

							<div class="flex flex-col min-w-0 flex-1">
								<span class="text-gray-800 dark:text-gray-200 font-medium truncate">
									{suggestion.label}
								</span>
								{#if suggestion.description}
									<span class="text-xs text-gray-500 dark:text-gray-400 truncate">
										{suggestion.description}
									</span>
								{/if}
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div> 