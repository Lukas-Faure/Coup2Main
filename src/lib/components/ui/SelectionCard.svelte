<script lang="ts">
	import { colorClasses2 } from '$lib/constants/ui';
	import type { ColorTheme } from '$lib/types/components';
	import type { Component } from 'svelte';

	let {
		title,
		description,
		icon,
		value,
		activeValue,
		colorTheme = 'green',
		onSelect
	}: {
		title: string;
		description: string;
		icon: Component;
		value: string;
		activeValue: string;
		colorTheme?: ColorTheme;
		onSelect: (value: string) => void;
	} = $props();

	const isActive = $derived(value === activeValue);
</script>

<button
	type="button"
	onclick={() => onSelect(value)}
	class="group p-8 border-2 rounded-2xl transition-all duration-300 hover:scale-105 text-center
    {isActive
		? `${colorClasses2[colorTheme]} shadow-lg`
		: 'border-gray-200 dark:border-gray-600 hover:shadow-md'}"
>
	<div class="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent class="w-16 h-16 text-{colorTheme}-600 dark:text-{colorTheme}-400" />
		{/if}
	</div>
	<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
	<p class="text-gray-600 dark:text-gray-300">{description}</p>
</button> 