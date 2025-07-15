<script lang="ts">
	import type { Component } from 'svelte';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import BackButton from './BackButton.svelte';
	import { badgeColorClasses, ButtonStyle, variantConfig } from '$lib/constants/ui';
	import { navigationStore } from '$lib/stores/navigation.store';

	export let title: string;
	export let subtitle: string = '';
	export let icon: Component | string = ''; 
	export let gradient: string = 'from-primary-600 to-purple-600';
	export let badgeText: string = '';
	export let badgeColor: keyof typeof badgeColorClasses = 'primary';
	export let actions: Array<{
		text: string, 
		variant?: keyof typeof variantConfig, 
		icon?: Component, 
		onClick?: () => void
	}> = [];
	export let stats: Array<{icon: Component | string, value: string | number, label: string, class?: string}> = []; 
	export let layout: 'center' | 'left' = 'center';
	export let showBackButton: boolean = false; 
</script>

<div class="text-{layout} mb-16 space-y-6">
	{#if showBackButton}
		<div class="mb-8 -mt-6">
			<BackButton onclick={navigationStore.goBack} text="Retour" />
		</div>
	{/if}

	{#if badgeText}
		<div class="inline-flex items-center px-4 py-2 rounded-full {badgeColorClasses[badgeColor]}">
			{#if icon}
				{#if typeof icon === 'string'}
					<span class="text-lg mr-2">{icon}</span>
				{:else}
					{@const IconComponent = icon}
					<IconComponent class="h-6 w-6 mr-2" />
				{/if}
			{/if}
			<span class="text-sm font-medium">{badgeText}</span>
		</div>
	{/if}

	<div class="flex flex-col {layout === 'left' ? 'md:flex-row' : ''} items-{layout === 'left' ? 'start md:items-center justify-between' : 'center'}">
		<div class="{layout === 'left' ? 'mb-6 md:mb-0' : ''}">
			<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
				{#if gradient}
					<span class="bg-gradient-to-r {gradient} dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
						{title}
					</span>
				{:else}
					{title}
				{/if}
			</h1>

			{#if subtitle}
				<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl {layout === 'center' ? 'mx-auto' : ''} mt-4">
					{subtitle}
				</p>
			{/if}
		</div>

		{#if actions.length > 0}
			<div class="flex space-x-3 {layout === 'left' ? 'mt-4 md:mt-0' : ''}">
				{#each actions as action}
					<Button
						buttonStyle={action.variant || ButtonStyle.SECONDARY}
						icon={action.icon}
						onClick={action.onClick}
					>
						{action.text}
					</Button>
				{/each}
			</div>
		{/if}
	</div>

	{#if stats.length > 0}
		<div class="bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-4 flex {layout === 'center' ? 'justify-center' : 'justify-start'} space-x-8">
			{#each stats as stat}
				<div class="flex items-center text-gray-700 dark:text-gray-300">
					{#if typeof stat.icon === 'string'}
						<span class="text-2xl mr-2 {stat.class || ''}">{stat.icon}</span>
					{:else}
						{@const IconComponent = stat.icon}
						<IconComponent class="h-6 w-6 mr-2 {stat.class || ''}" />
					{/if}
					<div>
						<div class="font-bold text-xl">{stat.value}</div>
						<div class="text-sm">{stat.label}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div> 