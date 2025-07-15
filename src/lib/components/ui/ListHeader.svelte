<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import { ArrowRight } from 'svelte-heros-v2';
	import type { Component } from 'svelte';
	import { ButtonSize, ButtonStyle } from '$lib/constants/ui';
	let {
		title,
		count,
		icon,
		onClick
	}: {
		title: string;
		count: number;
		icon: Component;
		onClick: () => void;
	} = $props();

	const countLabel = $derived(`${count} élément${count > 1 ? 's' : ''}`);
</script>

<div
	class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-blue-200/50 dark:border-blue-700/50"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
				{#if icon}
					{@const IconComponent = icon}
					<IconComponent class="w-5 h-5 text-white" />
				{/if}
			</div>
			<div>
				<h3 class="text-lg font-semibold text-blue-900 dark:text-blue-200">{title}</h3>
				<p class="text-sm text-blue-700 dark:text-blue-300">
					{countLabel}
				</p>
			</div>
		</div>
		<Button onClick={onClick} buttonStyle={ButtonStyle.GHOST} size={ButtonSize.SM} icon={ArrowRight} > 
			Tout voir
		</Button>
	</div>
</div> 