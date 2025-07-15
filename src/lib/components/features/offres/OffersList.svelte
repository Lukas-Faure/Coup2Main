<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import ListHeader from '$lib/components/ui/ListHeader.svelte';
	import OffreListItem from './OffreListItem.svelte';
	import type { Offre } from '$lib/types/offres';
	import type { EmptyStateAction } from '$lib/types/components';
	import { navigation } from '$lib/services/navigation.service';
	import { Plus, DocumentText } from 'svelte-heros-v2'; 
	import { ButtonStyle } from '$lib/constants/ui';
	let { offres } = $props<{ offres: Offre[] }>();

	const actions: EmptyStateAction[] = [
			{
				label: 'Publier ma première offre',
				onClick: navigation.goToNewOffer,
				buttonStyle: ButtonStyle.PRIMARY,
				icon: Plus
			}
		]
;
</script>

<div
	class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
>
	<ListHeader
		title="Vos dernières offres"
		count={offres.length}
		icon={DocumentText}
		onClick={() => navigation.goToOffres()}
	/>

	<div class="p-6">
		{#if offres.length > 0}
			<div class="space-y-4">
				{#each offres as offre}
					<OffreListItem {offre} />
				{/each}
			</div>

			<div class="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
				<Button onClick={navigation.goToNewOffer} buttonStyle={ButtonStyle.PRIMARY} icon={Plus} size="sm" fullWidth>
					Publier une nouvelle offre
				</Button>
			</div>
		{:else}
			<EmptyState
				title="Aucune offre publiée"
				description="Publiez votre première offre pour commencer à aider votre communauté ou recevoir de l'aide."
				icon={DocumentText}
				actions={actions}
			/>
		{/if}
	</div>
</div>