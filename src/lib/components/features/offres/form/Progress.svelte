<script lang="ts">
	let { current, total }: { current: number; total: number } = $props();

	const progressPercentage = $derived((current / (total - 1)) * 100);
</script>

<div class="mb-8">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Progression</h2>
		<span class="text-sm text-gray-500 dark:text-gray-400">
			Étape {current + 1} sur {total}
		</span>
	</div>
	<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
		<div
			class="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
			style="width: {progressPercentage}%"
		></div>
	</div>
</div> 