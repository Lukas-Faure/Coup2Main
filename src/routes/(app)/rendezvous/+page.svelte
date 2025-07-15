<script lang="ts">
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	
	import RendezVousList from '$lib/components/features/rendezvous/RendezVousList.svelte';
	
	import { RendezVousDisplayFilter } from '$lib/constants/rendezvous';
	import type { RendezVousDisplayFilterType } from '$lib/constants/rendezvous';
	import { CalendarDays } from 'svelte-heros-v2';


	let currentFilter = $state<RendezVousDisplayFilterType>(RendezVousDisplayFilter.ALL);
	let searchTerm = $state('');
	let totalRendezVous = $state(0);

</script>

<svelte:head>
	<title>Mes Rendez-vous - Coup2Main</title>
	<meta name="description" content="Gérez vos rendez-vous avec la communauté Coup2Main" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<PageHeader 
			title="Mes rendez-vous"
			subtitle="Suivez et gérez tous vos rendez-vous d'entraide"
			badgeText="Rendez-vous"
			badgeColor="emerald"
			gradient="from-emerald-600 to-green-600"
			icon={CalendarDays}
		/>

		<RendezVousList bind:totalRendezVous={totalRendezVous} selectedFilter={currentFilter} searchTerm={searchTerm} showViewAllButton={false} />
	</div>
</main>