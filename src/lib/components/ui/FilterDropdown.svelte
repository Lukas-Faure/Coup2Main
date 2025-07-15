<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	let {
		label,
		icon,
		active,
		children,
		onClick,
	}: {
		label: string;
		icon: Component	;
		active: boolean;
		children: Snippet;
		onClick: () => void;
	} = $props();

</script>

<div class="relative w-full">
	<button
		aria-label={label}	
		type="button"
		onclick={onClick}
		title={label}
		class="w-full h-full flex items-center justify-center px-4 py-3 rounded-lg transition-all {active
			? 'bg-primary-100/60 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700/50'
			: 'bg-gray-50/80 dark:bg-gray-700/80 border-gray-200/80 dark:border-gray-600/80 hover:bg-gray-100 dark:hover:bg-gray-700'}"
	>
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent
				class="w-5 h-5 transition-colors {active
					? 'text-primary-600 dark:text-primary-300'
					: 'text-gray-600 dark:text-gray-300'}"
			/>
		{/if}
	</button>
	{@render children()}
</div> 