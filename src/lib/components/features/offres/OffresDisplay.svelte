<script lang="ts">
	import { offresStore } from '$lib/stores/offres.store';
	import OffreCard from './OffreCard.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import { MagnifyingGlass } from 'svelte-heros-v2';

	const filteredOffres = offresStore.filtered;

</script>

{#if $offresStore.loading}
	<div class="flex justify-center items-center h-64">
		<LoadingSpinner size="lg" />
	</div>
{:else if $filteredOffres.length > 0}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each $filteredOffres as offre (offre.id)}
			<OffreCard {offre} />
		{/each}
	</div>
{:else}
	<div class="col-span-1 sm:col-span-2 lg:col-span-3">
		<EmptyState 
			icon={MagnifyingGlass}
			title={'Aucune offre trouvée'}
			description={'Essayez de modifier vos filtres ou de vérifier plus tard.'}
		/>
	</div>
{/if} 