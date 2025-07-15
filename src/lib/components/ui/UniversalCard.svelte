<script lang="ts">
	import type { Component } from 'svelte';

	let {
		title,
		subtitle,
		value,
		icon,
		iconColor,
		iconBgColor,
	}: {
		title: string;
		subtitle?: string;
		value?: number;
		icon?: Component;
		iconColor?: string;
		iconBgColor?: string;
	} = $props();

</script>

<article 
	class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/50 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1  overflow-hidden min-w-[19.6rem]"
	role={'generic'}
>
	<div class="relative z-10">
		<div class="mb-3">
			<div class="flex items-center gap-2">
				{#if icon}
					{@const IconComponent = icon}
					<div class="flex-shrink-0 flex items-center justify-center rounded-full w-10 h-10 {iconBgColor || 'bg-gray-100 dark:bg-gray-700'}">
						<IconComponent class="w-6 h-6 {iconColor || 'text-gray-500 dark:text-gray-300'}" />
					</div>
				{/if}
				<div class="flex-1 min-w-0 text-left">
					<h3 class="font-semibold text-gray-900 dark:text-white leading-tight text-xl
						group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
						{title}
					</h3>

					{#if subtitle}
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
							{subtitle}
						</p>
					{/if}
				</div>
			</div>
		</div>
    </div>


	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none"></div>

    {#if value}
        <div class="absolute -top-4 -right-4 flex items-center justify-center rounded-full w-20 h-20 {iconBgColor || 'bg-gray-100 dark:bg-gray-700'} shadow-lg border border-white dark:border-gray-800 z-20">
            <div class="text-3xl font-bold {iconColor || 'text-gray-900 dark:text-gray-100'}">
                {value}
            </div>
        </div>
    {/if}

</article> 