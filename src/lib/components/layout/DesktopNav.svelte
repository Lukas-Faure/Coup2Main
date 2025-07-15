<script lang="ts">
	import { isPathActive } from '$lib/services/navigation.service';

	let { items, currentPath }: { items: any[]; currentPath: string } = $props();

</script>

<div class="flex items-center justify-center">
	<div class="flex items-center space-x-2" role="menubar">
		{#each items as item}
			<button
				onclick={item.onClick}
				class="group relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
                {isPathActive(item.href, currentPath)
									? 'text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-700 shadow-sm border border-primary-200/50 dark:border-primary-600/50'
									: 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:bg-gray-700/80'}"
				title={item.description}
				aria-current={isPathActive(item.href, currentPath) ? 'page' : undefined}
			>
				{#if item.icon}
					{@const IconComponent = item.icon}
					<span class="flex items-center space-x-2">
						<IconComponent
						class="w-5 h-5 transition-transform duration-200 group-hover:scale-110 {isPathActive(item.href, currentPath)
									? 'text-primary-700 dark:text-primary-300'
									: 'text-gray-700 dark:text-gray-300'}"
						/>
						<span>{item.label}</span>
					</span>
				{/if}

				{#if isPathActive(item.href, currentPath)}
					<div
						class="absolute inset-x-1 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-sm"
						aria-hidden="true"
					></div>
				{/if}
			</button>
		{/each}
	</div>
</div> 