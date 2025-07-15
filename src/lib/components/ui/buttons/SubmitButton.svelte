<script lang="ts">
	import { sizeConfig, variantConfig } from '$lib/constants/ui';
    import type { Component, Snippet } from 'svelte';
						
	let {
        disabled,
        className,
        icon,
        children,
	}: {
		disabled: boolean;
		className: string;
        icon?: Component;
        children?: Snippet;
	} = $props();

	const buttonClass = $derived(
		[
			'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
			sizeConfig['md'].base,
			'',
			disabled
				? variantConfig['primary'].disabled
				: variantConfig['primary'].normal,
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			!disabled ? 'hover:scale-105 active:scale-95' : '',
			className,
			'flex-col h-auto py-3' 
		]
			.filter(Boolean)
			.join(' ')
	);
 
</script>

<button
	type="submit"
	{disabled}
	class={buttonClass}
	aria-disabled={disabled}
>
    {#if icon}
		{@const IconComponent = icon}
		<span class="flex flex-col items-center mb-1">
			<IconComponent class="w-5 h-5 icon-top-text-bottom" />
		</span>
    {/if}
    {#if children}
        {@render children()}
    {/if}
</button> 
