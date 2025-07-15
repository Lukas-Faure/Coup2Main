<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import type { RendezVous } from '$lib/types/rendezvous';
	import { navigation } from '$lib/services/navigation.service';
	import { fetchRendezVous, deleteRendezVous } from '$lib/services/rendezvous.service';
	import LoadingSpinner from '../../ui/LoadingSpinner.svelte';
	import EmptyState from '../../ui/EmptyState.svelte';
	import { RendezVousDisplayFilter } from '$lib/constants/rendezvous';
	import type { RendezVousDisplayFilterType } from '$lib/constants/rendezvous';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { goToLogin } from '$lib/services/navigation.service';
	import ConfirmModal from '../../ui/ConfirmModal.svelte';
	import {
		Calendar,
		ArrowRight,
		MagnifyingGlass,
		Clock
	} from 'svelte-heros-v2';
	import { ButtonSize, ButtonStyle } from '$lib/constants/ui';
	import RendezVousListItem from './RendezVousListItem.svelte';
	let {
		selectedFilter,
		searchTerm,
		totalRendezVous = $bindable(),
		initialRendezVous = undefined,
		showViewAllButton = true
	}: {
		selectedFilter: RendezVousDisplayFilterType;
		searchTerm: string;
		totalRendezVous?: number;
		initialRendezVous?: RendezVous[];
		showViewAllButton?: boolean;
	} = $props();

	let loading = $state(true);
	let error = $state<string | null>(null);
	let rendezVous: RendezVous[] = $state([]);

	let showConfirmModal = $state(false);
	let modalMessage = $state('');
	let onConfirmAction: (() => Promise<void>) | null = $state(null);
	let selectedRendezVousId: string | null = $state(null);

	async function loadRendezVous(filterParams: any = {}) {
		loading = true;
		error = null;
		try {
			const data = await fetchRendezVous({
				limit: 50,
				offset: 0,
				...filterParams
			});
			rendezVous = Array.isArray(data.rendezVous) ? [...data.rendezVous] : [];
			totalRendezVous = data.total;
		} catch (e: any) {
			error = e.message || 'Erreur lors du chargement des rendez-vous';
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (initialRendezVous !== undefined) {
			rendezVous = Array.isArray(initialRendezVous) ? [...initialRendezVous] : [];
			totalRendezVous = Array.isArray(initialRendezVous) ? initialRendezVous.length : 0;
			loading = false;
			return;
		}

		const params: any = {};
		if (selectedFilter === RendezVousDisplayFilter.UPCOMING) {
			params.upcoming = true;
		} else if (selectedFilter !== RendezVousDisplayFilter.ALL) {
			params.statut = selectedFilter;
		}
		if (searchTerm) {
			params.search = searchTerm;
		}
		loadRendezVous(params);
	});

	onMount(() => {
		if (!$authStore.session) {
			goToLogin();
			return;
		}
	});

	async function handleDeleteRendezVous(id: string): Promise<void> {
		loading = true;
		try {
			const response = await deleteRendezVous(id);
			if (response.ok) {
				await loadRendezVous();
			}
			else {
				const errorData = await response.json();
				error = errorData.error || 'Erreur lors de la suppression du rendez-vous.';
			}
		} catch (e: any) {
			error = e.message || 'Erreur lors de la suppression du rendez-vous.';
		} finally {
			showConfirmModal = false;
			loading = false;
		}
	}

	function confirmRendezVousDeletion(rdv: RendezVous): void {
		selectedRendezVousId = rdv.id;
		modalMessage = 'Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible et le rendez-vous disparaîtra pour les deux parties.';
		onConfirmAction = () => handleDeleteRendezVous(rdv.id);
		showConfirmModal = true;
	}

	const sortedRendezVous = $derived(
		Array.isArray(rendezVous) ? [...rendezVous].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : []
	);

	const futureRendezVous = $derived(
		Array.isArray(sortedRendezVous) ? [...sortedRendezVous].filter((rdv) => new Date(rdv.date) > new Date()) : []
	);
	const pastRendezVous = $derived(
		Array.isArray(sortedRendezVous) ? [...sortedRendezVous].filter((rdv) => new Date(rdv.date) <= new Date()) : []
	);

</script>

<div
	class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
>
	<div
		class="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/25 dark:via-teal-900/25 dark:to-cyan-900/25 px-6 py-4 border-b border-emerald-200/60 dark:border-emerald-700/60"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<div
					class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
				>
					<Clock class="h-4 w-4 text-white" aria-hidden="true" />
				</div>
				<div>
					<h3 class="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
						Vos rendez-vous
					</h3>
					<p class="text-sm text-emerald-700 dark:text-emerald-300">
						{totalRendezVous} rendez-vous au total
					</p>
				</div>
			</div>
			{#if showViewAllButton}
				<Button
					onClick={navigation.goToRendezVous}
					buttonStyle="ghost"
					size="sm"
					icon={ArrowRight}
				>
					Tout voir
				</Button>
			{/if}
		</div>
	</div>

	<div class="p-6">
		{#if loading}
			<div class="flex items-center justify-center py-20">
				<LoadingSpinner size="lg" />
			</div>
		{:else if error}
			<div
				class="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-700 rounded-lg p-4"
			>
				<div class="flex items-center justify-between">
					<p class="text-red-700 dark:text-red-300">{error}</p>
					<button
						onclick={() => loadRendezVous({ selectedFilter, searchTerm })}
						class="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
					>
						Réessayer
					</button>
				</div>
			</div>
		{:else if rendezVous.length === 0}
			<EmptyState 
				icon={Calendar}
				title={'Aucun rendez-vous planifié'}
				description={'Explorez les offres disponibles et prenez contact pour planifier vos premiers rendez-vous.'}
				actions={[
					{
						label: 'Explorer les offres',
						onClick: navigation.goToOffres,
						icon: MagnifyingGlass
					}
				]}
			/>
		{:else}
			<div class="space-y-6">
				{#if futureRendezVous.length > 0}
					<div>
						<div class="flex items-center space-x-2 mb-4">
							<div
								class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse shadow-sm"
							></div>
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
								À venir ({futureRendezVous.length})
							</h4>
						</div>
						<div class="space-y-3">
							{#each futureRendezVous as rdv}
								<RendezVousListItem rendezVous={rdv} onDelete={confirmRendezVousDeletion} />
							{/each}
						</div>
					</div>
				{/if}

				{#if pastRendezVous.length > 0}
					<div>
						<div class="flex items-center space-x-2 mb-4">
							<div class="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
							<h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
								Passés ({pastRendezVous.length})
							</h4>
						</div>
						<div class="space-y-3">
							{#each pastRendezVous as rdv}
								<RendezVousListItem rendezVous={rdv} onDelete={confirmRendezVousDeletion} />
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
				<Button
					onClick={navigation.goToOffres}
					buttonStyle={ButtonStyle.SECONDARY}
					icon={MagnifyingGlass}
					size={ButtonSize.SM}
					fullWidth
				>
					Explorer les offres
				</Button>
			</div>
		{/if}
	</div>
</div>

{#if showConfirmModal}
	<ConfirmModal
		message={modalMessage}
		onConfirm={() => { if (onConfirmAction) onConfirmAction(); }}	
		bind:isOpen={showConfirmModal}
		title="Confirmation d'action"
	/>
{/if}