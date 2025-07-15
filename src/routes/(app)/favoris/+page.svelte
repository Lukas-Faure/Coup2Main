<script lang="ts">
	import { onMount } from 'svelte';
	import type { Offre } from '$lib/types/offres';
	import { loadFavorisOffres as loadFavorisOffresService } from '$lib/services/favoris.service';
	import { ButtonStyle } from '$lib/constants/ui';
	import BackButton from '$lib/components/ui/BackButton.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import FavorisGrid from '$lib/components/features/favoris/FavorisGrid.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import FeedbackMessage from '$lib/components/ui/FeedbackMessage.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { Heart, MagnifyingGlass, HandRaised, Wrench } from 'svelte-heros-v2';		
	import { OFFRE_TYPE_DEMANDE, OFFRE_TYPE_PROPOSITION } from '$lib/constants';

	let loading = $state(true);
	let error = $state<string | null>(null);
	let offres = $state<Offre[]>([]);

	async function loadFavorisOffres() {
		loading = true;
		error = null;
		try {
			offres = await loadFavorisOffresService();
		} catch (e: any) {
			error = e.message || 'Erreur de connexion';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadFavorisOffres();
	});

	const stats = $derived({
		total: offres.length,
		demandes: offres.filter((f) => f.type === OFFRE_TYPE_DEMANDE).length,
		propositions: offres.filter((f) => f.type === OFFRE_TYPE_PROPOSITION).length
	});

</script>

<svelte:head>
	<title>Mes Favoris - Coup2Main</title>
	<meta name="description" content="Consultez vos offres favorites sur Coup2Main" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="mb-8">
			<BackButton onclick={navigation.goToHome} text="Retour à l'accueil" />	
		</div>

		<div
			class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8"
		>
			<PageHeader 
				title="Mes Favoris"
				subtitle="Les offres que vous avez sauvegardées"
				layout="left"
				icon={Heart}
				gradient="from-red-500 to-red-600"
				badgeText="Favoris"
				badgeColor="red"
				stats={[
					{ icon: Heart, value: stats.total, label: 'Total', class: 'text-red-500 w-8 h-8' },
					{ icon: HandRaised, value: stats.demandes, label: 'Demandes', class: 'text-blue-500 w-8 h-8' },
					{ icon: Wrench, value: stats.propositions, label: 'Propositions', class: 'text-orange-500 w-8 h-8' }
				]}
			/>

			{#if loading}
				<div class="flex justify-center py-20">
					<LoadingSpinner size="lg" color="primary" />
				</div>
			{:else if error}
				<div class="mb-8">
					<FeedbackMessage type="error" message={error} position="inline" />
					<button onclick={loadFavorisOffres} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
						Réessayer
					</button>
				</div>
			{:else if offres.length > 0}
				<FavorisGrid {offres} />
			{:else}
				<EmptyState 
					icon={MagnifyingGlass}
					title={'Votre liste de favoris est vide'}
					description={'Parcourez les offres et cliquez sur le cœur pour les ajouter ici.'}
					actions={[{
						label: 'Explorer les offres',
						onClick: navigation.goToOffres,
						buttonStyle: ButtonStyle.PRIMARY,
						icon: MagnifyingGlass
					}]}
				/>
			{/if}
		</div>
	</div>
</main>