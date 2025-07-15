<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.store';
	import { navigation } from '$lib/services/navigation.service';
	import { loadRendezVousById as loadRendezVousByIdService, acceptRendezVous, refuseRendezVous, proposeNewDate, deleteRendezVous } from '$lib/services/rendezvous.service';
	import type { RendezVous, PopulatedRendezVous } from '$lib/schemas/rendezvous.schema';
	import type { UserInfo } from '$lib/types/app';
	import { getUserById } from '$lib/services/user.service';

	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import FeedbackMessage from '$lib/components/ui/FeedbackMessage.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { formatDate, getRelativeDayString, formatTimeOfDay } from '$lib/utils/date';
	import { CheckCircle, XCircle, CalendarDays, Clock, User, Pencil, Trash } from 'svelte-heros-v2'; 
	import RendezVousPlanner from '$lib/components/features/rendezvous/RendezVousPlanner.svelte'; 
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import { ButtonSize, ButtonStyle, AvatarShape, FEEDBACK_TYPE_SUCCESS, FEEDBACK_TYPE_ERROR } from '$lib/constants/ui';
	import { DEFAULT_ERROR_MESSAGE } from '$lib/constants';
	import { RendezVousStatus, getStatusInfo } from '$lib/constants/rendezvous';

	import { callRendezVousApi } from '$lib/utils/rendezvous-actions.utils';


	let rendezvous = $state<PopulatedRendezVous | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let actionLoading = $state(false);
	let showProposeDateForm = $state(false);

	let lastModifiedByUser = $state<UserInfo | null>(null);
	let successMessage = $state<string | null>(null); 

	let showConfirmModal = $state(false);
	let modalMessage = $state('');
	let onConfirmAction: (() => Promise<void>) | null = $state(null);

	const rendezvousId = $derived($page.params.id);
	const currentUserId = $derived($authStore.session?.user?.id);

	const isCreator = $derived(rendezvous?.userId === currentUserId); 
	const isRecipient = $derived(rendezvous?.offre?.userId === currentUserId); 
	const isParticipant = $derived(isCreator || isRecipient);

	const hasAnyPartyAccepted = $derived(rendezvous && (rendezvous.demandeurAccepte || rendezvous.offreurAccepte));

	const participantName = $derived(rendezvous ? (isCreator ? (rendezvous.offre.user.name ?? 'U') : (rendezvous.user.name ?? 'U')) : 'N/A');
	const participantImage = $derived(rendezvous ? (isCreator ? (rendezvous.offre.user.image ?? '') : (rendezvous.user.image ?? '')) : '');

	const currentRendezvousStatutInfo = $derived(rendezvous ? getStatusInfo(rendezvous.statut) : getStatusInfo(RendezVousStatus.PROPOSE));

	async function loadLastModifiedByUser() {
		let user: UserInfo | null = null;
		if (rendezvous?.lastModifiedBy) {
			try {
				user = await getUserById(rendezvous.lastModifiedBy);
			} catch {
				console.error('Error loading last modified user:');
			}
		}
		lastModifiedByUser = user;
	}

	async function loadRendezVous() {
		loading = true;
		error = null;
		let loadedRendezvous: PopulatedRendezVous | null = null;
		try {
			if (rendezvousId) {
				const fetchedRendezvous = await loadRendezVousByIdService(rendezvousId);
				const offreOwnerId = fetchedRendezvous?.offre?.user?.id;
				const currentUserIdValue = currentUserId;

				
				if (fetchedRendezvous && (fetchedRendezvous.userId === currentUserId || offreOwnerId === currentUserIdValue)) {
					loadedRendezvous = fetchedRendezvous;
				} else {
					console.warn('Access denied (client-side) for rendezvous:', rendezvousId);
					error = "Vous n'êtes pas autorisé à voir ce rendez-vous.";
				}
			} else {
				error = "ID de rendez-vous manquant.";
			}
		} catch (e: any) {
			console.error('Error loading rendezvous (client-side):', e);
			error = e.message || DEFAULT_ERROR_MESSAGE;
		} finally {
			rendezvous = loadedRendezvous;
			loading = false;
			if (rendezvous) {
				loadLastModifiedByUser();
			}
		}
	}

	async function handleAccept() {
		if (!rendezvous || actionLoading) return;
		actionLoading = true;
		error = null;

		try {
			const updatedData = await callRendezVousApi<PopulatedRendezVous>({
				apiCall: () => acceptRendezVous(rendezvous!.id!),
				errorMessage: "Erreur lors de l'acceptation du rendez-vous."
			});
			rendezvous = updatedData;
		} catch (e: any) {
			error = e.message;
		} finally {
			actionLoading = false;
		}
	}

	async function handleRefuse() {
		if (!rendezvous || actionLoading) return;
		actionLoading = true;
		error = null;

		try {
			const updatedData = await callRendezVousApi<PopulatedRendezVous>({
				apiCall: () => refuseRendezVous(rendezvous!.id!),
				errorMessage: "Erreur lors du refus du rendez-vous."
			});
			rendezvous = updatedData;
		} catch (e: any) {
			error = e.message;
		} finally {
			actionLoading = false;
		}
	}

	async function handleProposeDate(date: Date, message?: string) {
		if (!rendezvous || actionLoading) return;
		actionLoading = true;
		error = null; 

		try {
			const updatedData = await callRendezVousApi<PopulatedRendezVous>({
				apiCall: () => proposeNewDate(rendezvous!.id!, date, message),
				errorMessage: "Erreur lors de la proposition de nouvelle date."
			});
			rendezvous = updatedData;
		} catch (e: any) {
			error = e.message;
		} finally {
			actionLoading = false;
		}
	}

	async function handleDeleteRendezVous() {
		if (!rendezvous || actionLoading) return;
		actionLoading = true;
		error = null;

		try {
			await callRendezVousApi<any>({
				apiCall: () => deleteRendezVous(rendezvous!.id!),
				errorMessage: 'Erreur lors de la suppression du rendez-vous.'
			});
			successMessage = "Rendez-vous supprimé avec succès.";
			setTimeout(() => navigation.goToRendezVous(), 1500);
		} catch (e: any) {
			error = e.message;
		} finally {
			actionLoading = false;
			showConfirmModal = false; 
		}
	}

	function confirmDeleteRendezVous() {
		const message = 'Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible et le rendez-vous disparaîtra pour les deux parties.';
		modalMessage = message;
		onConfirmAction = handleDeleteRendezVous;
		showConfirmModal = true;
	}

	onMount(() => {
		if ($authStore.session) {
			loadRendezVous();
		} else {
			navigation.goToLogin(navigation.getRendezVousDetailPath(rendezvousId));
		}
	});

	const headerTitle = $derived(rendezvous ? `Rendez-vous avec ${isCreator ? rendezvous.offre.user.name : rendezvous.user.name}` : 'Détails du rendez-vous');
	const subTitle = $derived(rendezvous?.offre?.title ? `Pour l'offre: ${rendezvous.offre.title}` : '');

</script>

<svelte:head>
	<title>{headerTitle} - Coup2Main</title>
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-12">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<PageHeader
			title={headerTitle}
			subtitle={subTitle}
			layout="left"
			showBackButton={true}
		/>

		{#if loading}
			<div class="flex justify-center py-20">
				<LoadingSpinner size="lg" color="primary" />
			</div>
		{:else if error}
			<div class="flex justify-center py-20">
				<FeedbackMessage type={FEEDBACK_TYPE_ERROR} message={error} position="inline" />
			</div>
		{:else if successMessage}
			<div class="flex justify-center py-20">
				<FeedbackMessage type={FEEDBACK_TYPE_SUCCESS} message={successMessage} position="inline" />
			</div>
		{:else if rendezvous}
			{@const currentRendezvous = rendezvous}
			<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 space-y-8">
				{#if currentRendezvous.statut}
					<div class="p-4 {currentRendezvousStatutInfo?.colors ?? ''} rounded-lg text-center font-semibold">
						Rendez-vous {currentRendezvousStatutInfo?.label.toLowerCase() ?? ''}!
						{#if currentRendezvous.statut === RendezVousStatus.CONFIRME}
							<CheckCircle class="inline w-5 h-5 ml-2" />
						{/if}
					</div>
				{/if}

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Détails du rendez-vous</h3>
						<div class="space-y-3 text-gray-700 dark:text-gray-300">
							<p class="flex items-center"><CalendarDays class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" /> Date: {formatDate(currentRendezvous.date)} ({getRelativeDayString(currentRendezvous.date)})</p>
							<p class="flex items-center"><Clock class="w-5 h-5 mr-2 text-cyan-600 dark:text-cyan-400" /> Heure: {formatTimeOfDay(currentRendezvous.date)}</p>
							<p class="flex items-center"><User class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" /> Participant:
								<Avatar src={participantImage} name={participantName} size="sm" shape={AvatarShape.CIRCLE} className="ml-2" />
								<span class="ml-2 font-medium">{participantName}</span>
							</p>

							{#if currentRendezvous.statut && currentRendezvousStatutInfo?.icon}
								{@const IconComponent = currentRendezvousStatutInfo.icon}
								<p class="flex items-center">
									<IconComponent class="w-5 h-5 mr-2 {currentRendezvousStatutInfo?.textClass ?? ''}" />
									Statut: {currentRendezvousStatutInfo?.label ?? ''}
								</p>
							{/if}

							{#if currentRendezvous.message}
								<div class="mt-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
									<p class="text-sm text-gray-700 dark:text-gray-300 italic">"{currentRendezvous.message}"</p>
									{#if lastModifiedByUser}
										<p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">— Message de {lastModifiedByUser.name || 'un utilisateur'}</p>
									{/if}
								</div>
							{/if}
						</div>
					</div>

					<div>
						<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Offre associée</h3>
						{#if currentRendezvous.offre}
							<a href={navigation.getOffreDetailPath(currentRendezvous.offre.id)} class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow block no-underline">
								<h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">{currentRendezvous.offre.title}</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{currentRendezvous.offre.description}</p>
							</a>
						{:else}
							<p class="text-gray-600 dark:text-gray-400">Aucune offre associée.</p>
						{/if}
					</div>
				</div>

				<div class="flex flex-wrap justify-end gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
					{#if currentRendezvous && currentRendezvous.statut === RendezVousStatus.PROPOSE && new Date(currentRendezvous.date) > new Date() && currentUserId !== currentRendezvous.lastModifiedBy && !currentRendezvous.demandeurAccepte && !currentRendezvous.offreurAccepte}
						<Button onClick={handleAccept} buttonStyle={ButtonStyle.GREEN_SUCCESS} disabled={actionLoading}>
							<CheckCircle class="w-5 h-5 mr-2" />
							Accepter
						</Button>
					{/if}

					{#if currentRendezvous && (isCreator || isRecipient) && !showProposeDateForm && !hasAnyPartyAccepted && currentRendezvous.statut !== RendezVousStatus.TERMINE && currentRendezvous.statut !== RendezVousStatus.ANNULE}
						<Button onClick={() => showProposeDateForm = true} buttonStyle={ButtonStyle.SECONDARY} icon={Pencil} size={ButtonSize.SM}>
							Proposer une autre date
						</Button>
					{/if}

					{#if isParticipant}
						<Button onClick={confirmDeleteRendezVous} buttonStyle={ButtonStyle.RED_DANGER} icon={Trash} disabled={actionLoading}>
							Supprimer
						</Button>
					{/if}
				</div>

				{#if showProposeDateForm}
					<RendezVousPlanner
						isOpen={showProposeDateForm}
						offreId={currentRendezvous.offre.id}
						offreTitle={currentRendezvous.offre.title}
						initialDate={currentRendezvous.date}
						onPropose={handleProposeDate}
						onClose={() => showProposeDateForm = false}	
					/>
				{/if}
			</div>
		{/if}
	</div>
</main>

{#if showConfirmModal}
	<ConfirmModal
		message={modalMessage}
		onConfirm={() => { if (onConfirmAction) onConfirmAction(); }}	
		bind:isOpen={showConfirmModal}
		title="Confirmer la suppression"
	/>
{/if} 