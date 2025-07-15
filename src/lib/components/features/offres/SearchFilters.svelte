<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';
	import { fly } from 'svelte/transition';
	import { CATEGORIES, TYPES, FilterType } from '$lib/constants';
	import type { Offre } from '$lib/types/offres';
	import { LocationService } from '$lib/services/location.service';
	import SuggestionDropdown from '$lib/components/ui/SuggestionDropdown.svelte';
	import type { SuggestionConfig } from '$lib/types/components';
	import FilterDropdown from '$lib/components/ui/FilterDropdown.svelte';
	import FilterOptionList from '$lib/components/ui/FilterOptionList.svelte';
	import { XMark, Tag, Squares2x2, MagnifyingGlass, MapPin } from 'svelte-heros-v2';


	let { allOffers, onFilterChange }: { allOffers: Offre[], onFilterChange: (filters: any) => void } = $props();

	let filters = $state({
		type: '',
		category: '',
		location: '',
		search: ''
	});

	let activeDropdown = $state<FilterType | null>(null);

	function handleFilterChange() {
		onFilterChange(filters);
	}

	function resetFilters() {
		filters = { type: '', category: '', location: '', search: '' };
		activeDropdown = null;
		handleFilterChange();
	}

	function toggleDropdown(name: FilterType) {
		activeDropdown = activeDropdown === name ? null : name;
	}

	function selectFilter(name: FilterType, value: string) {
		filters[name] = value;
		activeDropdown = null;
		handleFilterChange();
	}

	function handleSearchInput(value: string) {
		filters.search = value;
		handleFilterChange();
	}

	function handleLocationInput(value: string) {
		filters.location = value;
		handleFilterChange();
	}

	const hasActiveFilters = $derived(Object.values(filters).some((value) => value !== ''));
	const selectedType = $derived(
		TYPES.find((t) => t.value === filters.type) || { icon: Tag, label: 'Type' }
	);
	const selectedCategory = $derived(
		CATEGORIES.find((c) => c.value === filters.category) || {
			icon: Squares2x2,
			label: 'Catégorie'
		}
	);
	
	const searchSuggestionConfig: SuggestionConfig = {
		placeholder: 'Service, matériel, compétence...',
		icon: MagnifyingGlass,
		staticSuggestions: [...new Set(allOffers.map((o) => o.title))].map((title) => ({
			label: title,
			value: title
		})),
		showOnFocus: false,
		minQueryLength: 2
	};

	const locationSuggestionConfig: SuggestionConfig = {
		placeholder: 'Ville, code postal...',
		icon: MapPin,
		loadSuggestions: LocationService.getSuggestions
	};
</script>

<div class="sticky top-4 z-40 mb-8" role="search">
	<div
		class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl max-w-5xl mx-auto transition-all duration-300 ease-in-out"
	>
		<div class="p-4 md:p-6">
			<div class="flex items-center justify-between mb-4 px-1">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
					Rechercher une offre
				</h3>
				{#if hasActiveFilters}
					<button
						onclick={resetFilters}
						class="flex-shrink-0 flex items-center px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-red-300 dark:border-red-700 hover:border-red-500 dark:hover:border-red-500"
					>
						<XMark class="h-4 w-4 mr-1" aria-hidden="true" />
						Tout effacer
					</button>
				{/if}
			</div>

			<div class="grid grid-cols-1 md:grid-cols-12 gap-3">
				<div class="relative md:col-span-6 group">
					<SuggestionDropdown
						placeholder={searchSuggestionConfig.placeholder}
						icon={searchSuggestionConfig.icon}
						staticSuggestions={searchSuggestionConfig.staticSuggestions}
						showOnFocus={searchSuggestionConfig.showOnFocus}
						validationClasses={'border border-gray-300 dark:border-gray-600'}
						bind:value={filters.search}
						onSelect={handleFilterChange}
						onInput={handleSearchInput}
						inputClass="text-gray-900 dark:text-gray-100"
					/>
				</div>

				<div class="relative md:col-span-4 group">
					<SuggestionDropdown
						placeholder={locationSuggestionConfig.placeholder}
						icon={locationSuggestionConfig.icon}
						loadSuggestions={locationSuggestionConfig.loadSuggestions}
						validationClasses={'border border-gray-300 dark:border-gray-600'}
						bind:value={filters.location}
						onSelect={handleFilterChange}
						onInput={handleLocationInput}
						inputClass="text-gray-900 dark:text-gray-100"
					/>
				</div>

				<div class="md:col-span-2 flex items-center gap-2 w-full">
					<FilterDropdown
						label={selectedType.label}
						icon={selectedType.icon}
						active={!!filters.type}
						onClick={() => toggleDropdown(FilterType.TYPE)}
					>
						{#if activeDropdown === FilterType.TYPE}
							<div
								class="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden"
								use:clickOutside={() => (activeDropdown = null)}
								transition:fly={{ y: -5, duration: 200 }}
							>
								<FilterOptionList
									options={TYPES}
									selectedValue={filters.type}
									onSelect={(value) => selectFilter(FilterType.TYPE, value)}
								/>
							</div>
						{/if}
					</FilterDropdown>

					<FilterDropdown
						label={selectedCategory.label}
						icon={selectedCategory.icon}
						active={!!filters.category}
						onClick={() => toggleDropdown(FilterType.CATEGORY)}
					>
						{#if activeDropdown === FilterType.CATEGORY}
							<div
								class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden"
								use:clickOutside={() => (activeDropdown = null)}
								transition:fly={{ y: -5, duration: 200 }}
							>
								<FilterOptionList
									options={CATEGORIES}
									selectedValue={filters.category}
									onSelect={(value) => selectFilter(FilterType.CATEGORY, value)}
								/>
							</div>
						{/if}
					</FilterDropdown>
				</div>
			</div>
		</div>
	</div>
</div> 