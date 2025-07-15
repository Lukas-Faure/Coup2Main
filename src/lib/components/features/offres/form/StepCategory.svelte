<script lang="ts">
	import { CATEGORIES } from '$lib/constants';

	let {
		category,
		onSelect,
	}: {
		category: string;
		onSelect: (category: string) => void;
	} = $props();

</script>

<div class="p-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dans quelle catégorie ?</h2>
		<p class="text-lg text-gray-600 dark:text-gray-300">Sélectionnez la catégorie qui correspond le mieux</p>
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
		{#each CATEGORIES as cat}
			<button
				type="button"
				onclick={() => onSelect(cat.value)}
				class="group p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 {category === cat.value ? `border-${cat.colorTheme}-500 bg-${cat.colorTheme}-50 dark:bg-${cat.colorTheme}-900/20 shadow-lg` : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md'}"
			>
				<div class="flex flex-col items-center text-center">
					<div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-{cat.colorTheme}-100 dark:bg-{cat.colorTheme}-900/30 rounded-full mb-4">
						<cat.icon class="w-8 h-8 {cat.color}" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-gray-900 dark:text-white mb-1">{cat.label}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-300">{cat.description}</p>
					</div>
				</div>
			</button>
		{/each}
	</div>
</div> 