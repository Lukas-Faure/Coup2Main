<script lang="ts">
	import { onMount } from 'svelte';
	import { offresStore } from '$lib/stores/offres.store';
	import SearchFilters from '$lib/components/features/offres/SearchFilters.svelte';
	import OffresDisplay from '$lib/components/features/offres/OffresDisplay.svelte';
	import { OffreServiceClient } from '$lib/services/offre.service';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { Briefcase } from 'svelte-heros-v2';
	onMount(() => {
		OffreServiceClient.loadInitialOffres();
	});

	function handleFiltersChange(filters: any) {
		OffreServiceClient.applyFilters(filters);
	}
</script>

<svelte:head>
	<title>Toutes les offres - Coup2Main</title>
	<meta name="description" content="Découvrez toutes les offres d'entraide disponibles" />
</svelte:head>

<main class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<SectionHeader
				icon={Briefcase}
				subtitle="Explorer les offres"
				highlight="les offres"
			/>
		
		<div class="mb-12">
			<SearchFilters onFilterChange={handleFiltersChange} allOffers={$offresStore.allOffers} />
		</div>

		<OffresDisplay />
	</div>
</main> 