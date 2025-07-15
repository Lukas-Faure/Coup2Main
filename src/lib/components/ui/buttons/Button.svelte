<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { sizeConfig, variantConfig, ButtonSize, ButtonStyle } from '$lib/constants/ui';

	let {
		buttonStyle = ButtonStyle.PRIMARY,
		size = ButtonSize.MD,
		disabled = false,
		fullWidth = false,
		icon = undefined,
		className = '',
		loading = false,
		onClick = () => {},
		children,
	}: {
		buttonStyle?: keyof typeof variantConfig;
		size?: (typeof ButtonSize)[keyof typeof ButtonSize];
		disabled?: boolean;
		fullWidth?: boolean;
		icon?: Component; 
		className?: string; 
		loading?: boolean;
		onClick?: (event: MouseEvent) => void;
		children?: Snippet;
	} = $props();

	const hasChildren = $derived(!!children);

	const buttonClass = $derived(
		[
			'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
			sizeConfig[size].base,
			fullWidth ? 'w-full' : '',
			disabled
				? variantConfig[buttonStyle].disabled
				: variantConfig[buttonStyle].normal,
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			!disabled ? 'hover:scale-105 active:scale-95' : '',
			className,
		]
			.filter(Boolean)
			.join(' ')
	);

	function handleClick(event: MouseEvent) {
		if (disabled || loading	) {
			event.preventDefault();
			return;
		}
		if (onClick) {
			onClick(event);
		}
	}

	const showLoadingSpinner = $derived(loading);

	const iconSizeClass = $derived(sizeConfig[size].icon);
</script>

<button
	type="button"
	{disabled}
	class={buttonClass}
	onclick={handleClick}
>
	{#if showLoadingSpinner}
		<span class="flex items-center {hasChildren ? 'space-x-2' : ''}">
			<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			{#if hasChildren}
				<span>Chargement...</span>
			{/if}
		</span>
	{:else}
		<span class="flex items-center space-x-2">
			{#if icon}
			{@const IconComponent = icon}
				<IconComponent class={iconSizeClass} />
			{/if}

			{#if hasChildren && children}
				<span>
					{@render children()}
				</span>
			{/if}
		</span>
	{/if}
</button> 