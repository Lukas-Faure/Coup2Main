<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { goToLogin } from '$lib/services/navigation.service';
	import type { Offre } from '$lib/types/offres';
	import type { RendezVous } from '$lib/types/rendezVous';
	import { loadDashboardData as loadDashboardDataService } from '$lib/services/dashboard.service';
	import navigation from '$lib/services/navigation.service';
	import { isRecentOffre } from '$lib/utils/offre.utils';

	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import DashboardStats from '$lib/components/features/dashboard/DashboardStats.svelte';
	import OffersList from '$lib/components/features/offres/OffersList.svelte';
	import RendezVousList from '$lib/components/features/rendezvous/RendezVousList.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import { Plus, ChatBubbleLeft } from 'svelte-heros-v2';
	import { Sparkles, RocketLaunch } from 'svelte-heros-v2';
	import type { DashboardStatsType } from '$lib/types/app';
	import { RendezVousDisplayFilter } from '$lib/constants/rendezvous';
	let { data } = $props();

	let lastOffres = $state<{ offres: Offre[]; total: number }>({ offres: [], total: 0 });
	let lastRendezvous = $state<RendezVous[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	
	async function loadDashboardData() {
		loading = true;
		error = null;
		try {
			const data = await loadDashboardDataService();
				lastOffres = data.lastOffres;
				lastRendezvous = Array.isArray(data.lastRendezvous) ? data.lastRendezvous : [];
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

    const recentOffres = $derived(
        (Array.isArray(lastOffres.offres) ? lastOffres.offres : []).filter(isRecentOffre)
    );

	const stats : DashboardStatsType = $derived({
		totalOffres: lastOffres.total, 
		totalRendezVous: Array.isArray(lastRendezvous) ? lastRendezvous.length : 0,
		offresRecentes: recentOffres.length || 0,
		rendezVousProchains: Array.isArray(lastRendezvous) ? lastRendezvous.length : 0
	});

	onMount(() => {
		
		if ($authStore.session || data.session) {
			loadDashboardData();
		} else {
			goToLogin();
		}
	});

	function reloadPage() {
		window.location.reload();
	}
</script>

<svelte:head>
	<title>Tableau de bord - Coup2Main</title>
	<meta name="description" content="Gérez vos offres, messages et rendez-vous sur Coup2Main" />
</svelte:head>

<main
	class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<PageHeader 
			title="Tableau de bord"
			subtitle="Bienvenue, {$authStore.session?.user?.name || 'Utilisateur'} ! Voici un résumé de votre activité."
			layout="left"
			actions={[
				{ onClick: navigation.goToNewOffer, text: 'Publier une offre', variant: 'primary', icon: Plus },
				{ onClick: navigation.goToMessages, text: 'Voir les messages', variant: 'secondary', icon: ChatBubbleLeft }
			]}
		/>

		{#if loading}
			<div class="flex items-center justify-center py-20">
				<LoadingSpinner size="lg" color="primary" />
			</div>
		{:else if error}
			<div class="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="font-semibold text-red-700 dark:text-red-300">Erreur de chargement</h3>
						<p class="text-red-700 dark:text-red-300">{error}</p>
					</div>
					<button 
						onclick={reloadPage}
						class="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
					>
						Réessayer
					</button>
				</div>
			</div>
		{:else}
			<div class="space-y-8">
				<DashboardStats {stats} />

				{#if stats.totalOffres === 0 && stats.totalRendezVous === 0}
					<EmptyState
						icon={Sparkles}
						title={'Commencez votre aventure !'}
						description={
							"Vous n'avez pas encore d'activité. Publiez votre première offre ou explorez ce que propose votre communauté."
						}
						actions={[
							{
								label: 'Publier ma première offre',
								onClick: navigation.goToNewOffer,
								icon: RocketLaunch
							}
						]}
					/>
				{:else}
					<div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
						<OffersList offres={lastOffres.offres || []} />
						<RendezVousList selectedFilter={RendezVousDisplayFilter.UPCOMING} searchTerm="" initialRendezVous={lastRendezvous} showViewAllButton={true} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</main> 