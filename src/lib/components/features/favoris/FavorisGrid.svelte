<script lang="ts">
	import OffreCard from '$lib/components/features/offres/OffreCard.svelte';
	
	import type { Offre } from '$lib/types/offres'
	
	let { offres }: { offres: Offre[] } = $props();
	
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
	{#each offres as offre (offre.id)}
		<OffreCard {offre} />
	{/each}
</div> 