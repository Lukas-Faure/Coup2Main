<script lang="ts">
	import StatCard from '$lib/components/features/dashboard/StatCard.svelte';
	import { DocumentText, CalendarDays, Clock, Calendar } from 'svelte-heros-v2';
	import type { DashboardStatsType } from '$lib/types/app';
	
	let { stats } : { stats: DashboardStatsType } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
	<StatCard
		title="Mes offres"
		value={stats.totalOffres}
		icon={DocumentText}
		color="blue"
	/>
	<StatCard
		title="Rendez-vous"
		value={stats.totalRendezVous}
		icon={Calendar}
		color="green"
	/>
	<StatCard
		title="Offres récentes"
		value={stats.offresRecentes}
		icon={Clock}
		color="purple"
	/>
	<StatCard
		title="Prochains RDV"
		value={stats.rendezVousProchains}
		icon={CalendarDays}
		color="orange"
	/>
</div> 