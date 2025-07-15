<script lang="ts">
	import type { Offre } from '$lib/types/offres';
	import { categoryConfig, typeConfig } from '$lib/constants';
	import { badgeColorClasses } from '$lib/constants/ui';

	let { offre } = $props<{ offre: Offre }>();

	const categoryInfo = $derived(categoryConfig[offre.category as keyof typeof categoryConfig] || categoryConfig.autre);
	const typeInfo = $derived(typeConfig[offre.type as keyof typeof typeConfig] || typeConfig.proposition);

</script>

<div class="relative">
	<div
		class="h-48 relative overflow-hidden flex items-center justify-center
		bg-{categoryInfo.colorTheme}-100 dark:bg-{categoryInfo.colorTheme}-900/30"
	>
		<div class="absolute top-1/2 -translate-y-1/2 right-0 transform rotate-[-16deg] pointer-events-none">
			{#if categoryInfo.icon}
				{@const IconComponent = categoryInfo.icon}
				<IconComponent class="w-32 h-32 text-{categoryInfo.colorTheme}-500 dark:text-{categoryInfo.colorTheme}-300 opacity-20" />
			{/if}
		</div>

		<div class="absolute top-6 left-6 z-10">
			<div
				class="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold {badgeColorClasses[typeInfo.colorTheme]} backdrop-blur-sm shadow-md border border-white/20"
			>
				{#if typeInfo.icon}
					{@const IconComponent = typeInfo.icon}
					<IconComponent class="mr-2 text-lg" />
				{/if}
				{typeInfo.label}
			</div>
		</div>

		<h1 class="absolute bottom-6 left-6 z-10 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white max-w-sm">
			{offre.title}
		</h1>
	</div>
</div> 