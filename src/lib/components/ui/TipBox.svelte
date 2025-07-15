<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	let { title = 'Astuce', icon, children }: { title: string, icon: Component, children: Snippet } = $props();
</script>

<div
	class="inline-flex items-center space-x-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
>
	{#if icon}
		{@const IconComponent = icon}
		<IconComponent class="h-6 w-6" />
	{/if}
	<div class="text-left">
		<p class="font-medium text-gray-900 dark:text-gray-100">{title}</p>
		<p class="text-sm text-gray-600 dark:text-gray-400">
			{@render children()}
		</p>
	</div>
</div> 