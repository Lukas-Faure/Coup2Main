<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	let { icon, subtitle, highlight, children }: { icon: Component, subtitle: string, highlight: string, children?: Snippet } = $props();
</script>

<div class="text-center mb-16 space-y-4">
	{#if icon}
		{@const IconComponent = icon}
		<div class="mb-4">
			<IconComponent class="w-16 h-16 mx-auto text-primary-600 dark:text-primary-400" />
		</div>
	{/if}
	<h2 class="text-5xl lg:text-5xl font-bold text-gray-900 dark:text-white"> 
		{@html subtitle.replace(highlight, `<span class="bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">${highlight}</span>`)}
	</h2>
	<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
		{#if children}
			{@render children()}
		{/if}
	</p>
</div> 