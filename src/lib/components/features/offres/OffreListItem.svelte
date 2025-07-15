<script lang="ts">
	import { TYPES } from '$lib/constants';
	import { formatDate, parseDateToSafeDate } from '$lib/utils/date';
	import { navigation } from '$lib/services/navigation.service';
	import type { Offre } from '$lib/types/offres';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import { MapPin } from 'svelte-heros-v2'; 
	import { ButtonStyle } from '$lib/constants/ui';
	let { offre }: { offre: Offre } = $props();

	const typeInfo = $derived(TYPES.find((t) => t.value === offre.type) || TYPES[0]);

	const createdAtDate = $derived(parseDateToSafeDate(offre.createdAt));
</script>

<article
	class="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
>
	<Button 
		onClick={() => navigation.goToOffre(offre.id)}
		className="absolute inset-0 z-20"
		buttonStyle={ButtonStyle.GHOST}
	/>

	<div class="absolute top-4 right-4 z-10">
		<span
			class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 border border-primary-200 dark:border-primary-700/50"
		>
			<typeInfo.icon class="w-3 h-3 mr-1.5" />
			{typeInfo.label}
		</span>
	</div>

	<div class="p-5 relative z-10"> 
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 pr-16">
			{offre.title}
		</h3>

		<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
			{offre.description}
		</p>

		<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
			<div class="flex items-center space-x-4">
				{#if offre.location}
					<span class="flex items-center">
						<MapPin class="w-3 h-3 mr-1" />
						{offre.location}
					</span>
				{/if}
				{#if offre.category}
					<span class="capitalize">{offre.category}</span>
				{/if}
			</div>
			<time datetime={createdAtDate?.toISOString() || ''} class="font-medium">
				{formatDate(offre.createdAt)}
			</time>
		</div>
	</div>

	<div
		class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none"
	></div>
</article> 