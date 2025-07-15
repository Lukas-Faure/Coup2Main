<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.store';
	import type { OffreDetail } from '$lib/types/offres';	
	import { OffreServiceClient, getOffreById } from '$lib/services/offre.service';
	import { fetchRendezVous } from '$lib/services/rendezvous.service';
	import type { RendezVous } from '$lib/schemas/rendezvous.schema';

	import RendezVousPlanner from '$lib/components/features/rendezvous/RendezVousPlanner.svelte';
	import BackButton from '$lib/components/ui/BackButton.svelte';
	import OffreHeader from '$lib/components/features/offres/details/OffreHeader.svelte';
	import OffreUserInfo from '$lib/components/features/offres/details/OffreUserInfo.svelte';
	import OffreActions from '$lib/components/features/offres/details/OffreActions.svelte';
	import FeedbackMessage from '$lib/components/ui/FeedbackMessage.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { DEFAULT_ERROR_MESSAGE } from '$lib/constants';
	import { FEEDBACK_TYPE_SUCCESS } from '$lib/constants/ui';

	let showRendezVousPlanner = $state(false);
	let successMessage = $state('');
	
	let offre = $state<OffreDetail | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let existingRendezVous = $state<RendezVous | null>(null); 

	const offreId = $derived($page.params.id);
	const isOwner = $derived($authStore.session?.user?.id === offre?.user?.id);

	async function loadOffre(id: string) {
		loading = true;
		error = null;
		try {
			offre = await getOffreById(id) as OffreDetail;
		} catch (e: any) {
			error = e.message || DEFAULT_ERROR_MESSAGE;
		} finally {
			loading = false;
		}
	}

	async function loadExistingRendezVous() {
		let newExistingRendezVous: RendezVous | null = null;
		if (offreId && $authStore.session?.user?.id) {
			try {
				const rdvData = await fetchRendezVous({
					offreId: offreId,
					userId: $authStore.session.user.id, 
					limit: 1 
				});
				if (rdvData.rendezVous.length > 0) {
					newExistingRendezVous = rdvData.rendezVous[0];
				}
			} catch (e) {
				console.error("Erreur lors du chargement du rendez-vous existant:", e);
			}
		}
		existingRendezVous = newExistingRendezVous;
	}

	async function handleRendezVousProposed() {
		await loadExistingRendezVous();
	}

	onMount(() => {
		if (OffreServiceClient.checkUpdateSuccess()) {
			successMessage = 'Votre offre a été modifiée avec succès ! 🎉';
		}
		
		if (offreId) {
			loadOffre(offreId);
		}
		
		loadExistingRendezVous();
	});
</script>

<svelte:head>
	<title>{offre?.title || 'Offre'} - Coup2Main</title>
	<meta name="description" content={offre?.description || "Détails de l'offre"} />
</svelte:head>

{#if loading}
	<main class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
		<div class="text-center">
			<LoadingSpinner size="lg" color="primary" />
			<p class="text-lg text-gray-600 dark:text-gray-300 mt-4">Chargement de l'offre...</p>
		</div>
	</main>
{:else if error || !offre}
	<main class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
		<div class="text-center">
			<div class="text-6xl mb-4">😕</div>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Offre introuvable</h1>
			<p class="text-gray-600 dark:text-gray-300 mb-6">{error || "Cette offre n'existe pas ou a été supprimée."}</p>
			<BackButton onclick={navigation.goToHome} text="Retour à l'accueil" />
		</div>
	</main>
{:else}
	<main class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-6">
				<BackButton text="Retour aux offres" onclick={navigation.goToOffres} />	
			</div>

			<div
				class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden max-w-4xl mx-auto"
			>
				<OffreHeader {offre} />

				<div class="p-8">
					{#snippet actions()}
						<OffreActions
							offre={offre!} 	
							{isOwner}
							{existingRendezVous} 
							onPlanRendezVous={() => (showRendezVousPlanner = true)}
						/>
					{/snippet}
					<OffreUserInfo offre={offre!} {actions} />

					<div class="mb-8">
						<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
						<div class="prose prose-lg max-w-none">
							<p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{offre.description}</p>
						</div>
					</div>
				</div>
			</div>

			{#if showRendezVousPlanner && offre}
				<RendezVousPlanner 
					isOpen={showRendezVousPlanner}
					offreId={offre.id}
					offreTitle={offre.title}
					onPropose={handleRendezVousProposed} 
					onClose={() => (showRendezVousPlanner = false)}
				/>
			{/if}

			{#if successMessage}
				<FeedbackMessage type={FEEDBACK_TYPE_SUCCESS} message={successMessage} position="top-center" />
			{/if}
		</div>
	</main>
{/if} 