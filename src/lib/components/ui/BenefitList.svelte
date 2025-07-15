<script lang="ts">
	export let benefits: string[];
</script>

<div class="space-y-2">
	{#each benefits as benefit}
		<div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
			<span class="text-green-500 mr-2">✓</span>
			<span>{benefit}</span>
		</div>
	{/each}
</div> 