<script lang="ts">
	import type { PopulatedRendezVous } from '$lib/schemas/rendezvous.schema';
	import { getStatusInfo } from '$lib/constants/rendezvous';
	import type { RendezVousStatusType } from '$lib/constants/rendezvous';
	import { formatDate } from '$lib/utils/date';
	import { navigation } from '$lib/services/navigation.service';
	import { MapPin, Eye, Trash } from 'svelte-heros-v2';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import { ButtonSize, ButtonStyle } from '$lib/constants/ui';

	let { rendezVous, onDelete }: {
		rendezVous: PopulatedRendezVous;
		onDelete: (rdv: PopulatedRendezVous) => void;
	} = $props();

	const isPast = $derived(new Date(rendezVous.date) <= new Date());
	const statusInfo = $derived(getStatusInfo(rendezVous.statut as RendezVousStatusType));
</script>

<div
	class="group relative rounded-xl p-4 border transition-all duration-300 hover:shadow-md {isPast
		? 'bg-gradient-to-r from-gray-50/70 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border-gray-200/40 dark:border-gray-600/40 opacity-80 hover:opacity-100'
		: `bg-gradient-to-r from-white to-gray-50/80 dark:from-gray-800/90 dark:to-gray-700/50 border-gray-200/60 dark:border-gray-600/60 hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:scale-[1.01]`}"
>
	<div class="flex items-center justify-between mb-3">
		<span
			class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border {statusInfo.colors}"
		>
            {#if statusInfo.icon}
                {@const IconComponent = statusInfo.icon}
                <IconComponent class="w-3 h-3 mr-1.5" />
            {/if}
			{statusInfo.label}
		</span>
		<div class="text-right">
			<div class="text-sm font-semibold text-gray-900 dark:text-white">
				{formatDate(rendezVous.date)}
			</div>
			<div class="text-xs text-gray-600 dark:text-gray-400">
				{new Date(rendezVous.date).toLocaleTimeString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit'
				})}
			</div>
		</div>
	</div>

	{#if rendezVous.offre}
		<div class="mb-3">
			<h5 class="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
				{rendezVous.offre.title}
			</h5>
			{#if rendezVous.offre.user}
				<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
					avec {rendezVous.offre.user.name}
				</p>
			{/if}
		</div>
	{/if}

	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
			{#if rendezVous.offre.location}
				<div class="flex items-center">
					<MapPin class="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
					<span class="truncate max-w-32">{rendezVous.offre.location}</span>
				</div>
			{/if}
		</div>

		<div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
			<Button
				onClick={() => navigation.goToRendezVousDetail(rendezVous.id ?? '')}
				buttonStyle={ButtonStyle.GHOST}
				size={ButtonSize.XS}
				icon={Eye}
			>
				Voir
			</Button>
			<Button
				onClick={() => onDelete(rendezVous)}
				buttonStyle={ButtonStyle.GHOST}
				size={ButtonSize.XS}
				icon={Trash}
			>
				Supprimer
			</Button>
		</div>
	</div>

	<div
		class="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b {statusInfo.bgColor} rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
	></div>
</div> 