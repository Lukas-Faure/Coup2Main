<script lang="ts">
	import type { OffreDetail } from '$lib/types/offres'
	import navigation from '$lib/services/navigation.service';
	import { User, CalendarDays, ChatBubbleLeft, Sparkles, Pencil } from 'svelte-heros-v2';
	import { authStore } from '$lib/stores/auth.store';

	let {
		offre,
		isOwner,
		existingRendezVous = null,
		onPlanRendezVous
	} = $props<{
		offre: OffreDetail;
		isOwner: boolean;
		existingRendezVous?: any | null;
		onPlanRendezVous: () => void;
	}>();

	const isAuthenticated = $derived($authStore.session);
</script>

{#if !isOwner && isAuthenticated}
	<div class="flex space-x-3">
		{#if existingRendezVous}
			<button
				onclick={() => navigation.goToRendezVousDetail(existingRendezVous.id)}
				class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
			>
				<Pencil class="mr-2 w-5 h-5" />
				Modifier RDV
			</button>
		{:else}
			<button
				type="button"
				onclick={onPlanRendezVous}
				class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
			>
				<CalendarDays class="mr-2 w-5 h-5" />
				Planifier RDV
			</button>
		{/if}
		<button
			onclick={() => navigation.goToConversation(offre.userId, offre.id)}
			class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
		>
			<ChatBubbleLeft class="mr-2 w-5 h-5" />
			Contacter
		</button>
	</div>
{:else if isOwner}
	<div class="bg-gray-100 text-gray-600 py-4 px-8 rounded-2xl font-semibold">
		<Sparkles class="mr-2 w-5 h-5" />
		Votre offre
	</div>
{:else}
	<button
		onclick={() => navigation.goToLogin()}
		class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
	>
		<User class="h-4 w-4 mr-2" aria-hidden="true" />	
		Se connecter
	</button>
{/if} 