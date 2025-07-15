<script lang="ts">
	import SelectionCard from '$lib/components/ui/SelectionCard.svelte';
	import { TYPE_OPTIONS } from '$lib/constants';
	
	let { type, onSelectType } = $props<{
		type: string;
		onSelectType: (type: string) => void;
	}>();

</script>

<div class="p-8 text-center">
	<div class="mb-8">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Que souhaitez-vous faire ?</h2>
		<p class="text-lg text-gray-600 dark:text-gray-300">
			Choisissez le type d'offre que vous voulez publier
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
		{#each TYPE_OPTIONS as option}
			<SelectionCard
				title={option.label}
				description={option.description}
				icon={option.icon}
				value={option.value}
				activeValue={type}
				colorTheme={option.colorTheme}
				onSelect={(value: string) => onSelectType(value)}
			/>
		{/each}
	</div>
</div> 