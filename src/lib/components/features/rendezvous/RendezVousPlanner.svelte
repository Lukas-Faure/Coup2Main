<script lang="ts">
	import { authStore } from '$lib/stores/auth.store';
	import { goToLogin } from '$lib/services/navigation.service';
	import { createRendezVous } from '$lib/services/rendezvous.service';		
	import Button from '$lib/components/ui/buttons/Button.svelte'; 
	import { formatDate, formatTimeOfDay } from '$lib/utils/date'; 
	import SubmitButton from '$lib/components/ui/buttons/SubmitButton.svelte';
	import { ButtonStyle, timeOptions } from '$lib/constants/ui';
	let {
		isOpen = $bindable(false),
		offreId,
		offreTitle,
		initialDate = null,
		onPropose,
		onClose
	} = $props<{
		isOpen: boolean;
		offreId?: string; 
		offreTitle?: string; 
		initialDate?: Date | null; 
		onPropose: (date: Date, message?: string) => Promise<void>;
		onClose: () => void;
	}>();

	let selectedDatePart = $state(''); 
	let selectedTime = $state('');
	let message = $state('');
	let loading = $state(false);
	let errorMessage = $state<string | null>(null); 
	let successMessage = $state<string | null>(null); 


	$effect(() => {
		if (initialDate) {
			const date = new Date(initialDate);
			selectedDatePart = date.toISOString().split('T')[0];
			selectedTime = `${date.getHours().toString().padStart(2, '0')}:${(Math.floor(date.getMinutes() / 15) * 15).toString().padStart(2, '0')}`;
		} else {
			selectedDatePart = '';
			selectedTime = '';
		}
	});

	function validateInputs(): Date | null {
		let validatedDate: Date | null = null;
		errorMessage = null; 

		if (!$authStore.session) {
			goToLogin();
		} else if (!selectedDatePart || !selectedTime) {
			errorMessage = 'Veuillez sélectionner une date et une heure.';
		} else {
			const [hour, minute] = selectedTime.split(':').map(Number);
			const candidateDate = new Date(`${selectedDatePart}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`);

			if (isNaN(candidateDate.getTime())) {
				errorMessage = 'Date ou heure invalide.';
			} else {
				const now = new Date();
				if (candidateDate <= now) {
					errorMessage = 'La date/heure proposée doit être dans le futur.';
				} else {
					validatedDate = candidateDate;
				}
			}
		}
		return validatedDate;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		errorMessage = null;
		successMessage = null;

		const validatedDate = validateInputs();

		if (validatedDate) {
			loading = true;

			try {
				if (initialDate) {
					await onPropose(validatedDate, message.trim() || undefined);
					const displayedOffreTitle = offreTitle ? `pour ${offreTitle}` : '';
					successMessage = `Votre proposition de nouvelle date ${displayedOffreTitle} le ${formatDate(validatedDate)} à ${formatTimeOfDay(validatedDate)} a bien été envoyée !`;
				} else if (offreId) {
					const response = await createRendezVous({
						offreId,
						date: validatedDate.toISOString(),
						message: message.trim() || undefined
					});

					if (response.ok) {
						const displayedOffreTitle = offreTitle || 'l\'offre associée';
						successMessage = `Votre demande de rendez-vous pour ${displayedOffreTitle} le ${formatDate(validatedDate)} à ${formatTimeOfDay(validatedDate)} a bien été proposée.`;
						onPropose(validatedDate, message.trim() || undefined); 
					} else {
						const errorData = await response.json();
						errorMessage = errorData.error || 'Erreur lors de la proposition de rendez-vous';
					}
				} else {
					errorMessage = 'Contexte de proposition de rendez-vous invalide (ni offreId ni initialDate).';
				}
			} catch (error: any) {
				errorMessage = error.message || 'Erreur de connexion';
			} finally {
				loading = false;
			}
		} else {
			loading = false;
		}
	}

	function handleClose() {
		isOpen = false;
		selectedDatePart = ''; 
		selectedTime = ''; 
		message = '';
		errorMessage = null; 
		successMessage = null; 
		onClose();
	}

	function handleModify() {
		successMessage = null; 
		errorMessage = null; 
	}

	const minDateForInput = new Date().toISOString().split('T')[0];
</script>

{#if isOpen}
	<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
			<h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
				Proposer un rendez-vous
			</h3>
			{#if offreTitle}
			<p class="text-gray-600 dark:text-gray-400 mb-4">
				Pour : <strong>{offreTitle}</strong>
			</p>
			{/if}

			{#if successMessage}
				<div class="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
					{successMessage}
				</div>
				<div class="flex gap-3 justify-end mt-4">
					<Button onClick={handleModify} buttonStyle={ButtonStyle.SECONDARY}>
						Modifier
					</Button>
					<Button onClick={handleClose} buttonStyle={ButtonStyle.PRIMARY}>
						Fermer
					</Button>
				</div>
			{:else}
			<form onsubmit={handleSubmit}>
				<div class="mb-4">
					<label for="rdv-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date souhaitée</label>
					<input
						id="rdv-date"
						type="date"
						bind:value={selectedDatePart}
						min={minDateForInput} 
						required
						class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>

				<div class="mb-6">
					<label for="rdv-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Heure souhaitée</label>
					<select
						id="rdv-time"
						bind:value={selectedTime}
						required
						class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					>
						<option value="" disabled selected>Sélectionner l'heure et les minutes</option>
						{#each timeOptions as time}
							<option value={time}>{time}</option>
						{/each}
					</select>
				</div>

				<div class="mb-6">
					<label for="rdv-message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message (optionnel)</label>
					<textarea
						id="rdv-message"
						bind:value={message}
						placeholder="Précisez vos disponibilités ou autres détails..."
						class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
						rows="3"
					></textarea>
				</div>

				{#if errorMessage}
					<div class="mb-4">
						<p class="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
					</div>
				{/if}

				<div class="flex gap-3">
					<Button 
						onClick={handleClose}
						className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
					>
						Annuler
					</Button>
					<SubmitButton 
						disabled={!selectedDatePart || !selectedTime || loading}
						className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
					>
						{loading ? 'Envoi...' : 'Proposer'}
					</SubmitButton>
				</div>
			</form>
			{/if}
		</div>
	</div>
{/if} 