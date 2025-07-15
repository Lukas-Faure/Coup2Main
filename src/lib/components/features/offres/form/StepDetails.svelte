<script lang="ts">
	import SuggestionDropdown from '$lib/components/ui/SuggestionDropdown.svelte';
	import { LocationService } from '$lib/services/location.service';
	import type { SuggestionConfig } from '$lib/types/components';
	import { MapPin, DocumentText } from 'svelte-heros-v2'; 

	let {
		description = $bindable(),
		location = $bindable(),
		type,
		validationErrors
	} = $props<{
		description: string;
		location: string;
		type: string;
		validationErrors: Record<string, string>;
	}>();

	const locationSuggestionConfig: SuggestionConfig = {
		placeholder: 'Ex: Paris 15ème, Lyon...',
		icon: MapPin,
		loadSuggestions: (query: string) => LocationService.getSuggestions(query),
		validationClasses: validationErrors.location ? 'border-red-500' : ''
	};
</script>

<div class="p-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Finalisez votre offre</h2>
		<p class="text-lg text-gray-600 dark:text-gray-300"> Ajoutez les derniers détails pour que votre offre soit parfaite </p>
	</div>

	<div class="max-w-2xl mx-auto space-y-8">
		<div>
			<label for="description" class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
				<DocumentText class="w-5 h-5 inline-block mr-2" />Description détaillée
			</label>
			<div class="relative">
				<textarea
					id="description"
					bind:value={description}
					rows="6"
					placeholder={type === 'proposition'
						? 'Ex: Je propose de monter des meubles, faire des courses...'
						: 'Ex: Je cherche quelqu\'un pour m\'aider à déménager...'}
					class="w-full px-4 py-3 bg-gray-50/80 dark:bg-gray-700/80 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 {validationErrors.description ? 'border-red-500' : ''} text-gray-900 dark:text-gray-100"
					maxlength="500"
				></textarea>
				<div
					class="absolute right-4 bottom-3 text-xs font-medium {description.length > 450 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}"
				>
					{description.length} / 500
				</div>
			</div>
			{#if validationErrors.description}
				<p class="text-red-600 dark:text-red-400 text-sm mt-2">{validationErrors.description}</p>
			{/if}
		</div>

		<div>
			<label for="location" class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
				<MapPin class="w-5 h-5 inline-block mr-2" />Localisation
			</label>
			<SuggestionDropdown
				placeholder={locationSuggestionConfig.placeholder}
				icon={locationSuggestionConfig.icon}
				loadSuggestions={locationSuggestionConfig.loadSuggestions}
				validationClasses={locationSuggestionConfig.validationClasses}
				bind:value={location}
				onSelect={(item) => (location = item.label)}
				onInput={(value) => (location = value)}
				inputClass="text-gray-900 dark:text-gray-100"
			/>
			{#if validationErrors.location}
				<p class="text-red-600 dark:text-red-400 text-sm mt-2">{validationErrors.location}</p>
			{/if}
		</div>
	</div>
</div>
