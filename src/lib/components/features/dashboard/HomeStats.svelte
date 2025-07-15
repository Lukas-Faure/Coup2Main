<script lang="ts">
	import { offresStore } from '$lib/stores/offres.store';
	import UniversalCard from '$lib/components/ui/UniversalCard.svelte';
	import { ClipboardDocumentList, HandRaised, UserGroup } from 'svelte-heros-v2';
	import { OFFRE_TYPE_DEMANDE, OFFRE_TYPE_PROPOSITION } from '$lib/constants';

	const stats = $derived([
		{
			title: 'Offres actives',
			subtitle: 'Total des services disponibles',
			value: $offresStore.allOffers.length,
			icon: ClipboardDocumentList,
			iconColor: 'text-blue-500',
			iconBgColor: 'bg-blue-100'
		},
		{
			title: 'Services proposés',
			subtitle: 'Aide disponible de vos voisins',
			value: $offresStore.allOffers.filter((o) => o.type === OFFRE_TYPE_PROPOSITION).length,
			icon: HandRaised,
			iconColor: 'text-emerald-500',
			iconBgColor: 'bg-emerald-100'
		},
		{
			title: "Demandes d'aide",
			subtitle: "Voisins qui ont besoin d'aide",
			value: $offresStore.allOffers.filter((o) => o.type === OFFRE_TYPE_DEMANDE).length,
			icon: UserGroup,
			iconColor: 'text-purple-500',
			iconBgColor: 'bg-purple-100'
		}
	]);
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-20 max-w-4xl mx-auto mt-16">
	{#each stats as stat}
		<UniversalCard
			title={stat.title}
			subtitle={stat.subtitle}
			value={stat.value}
			icon={stat.icon}
			iconColor={stat.iconColor}
			iconBgColor={stat.iconBgColor}
		/>
	{/each}
</div> 