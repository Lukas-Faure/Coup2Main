<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import HowItWorksStep from '$lib/components/ui/HowItWorksStep.svelte';
	import { HOW_IT_WORKS_STEPS } from '$lib/constants';
	import { Sparkles } from 'svelte-heros-v2';
	
</script>

<section class="py-20 relative overflow-hidden">
	<div
		class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"
	></div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<SectionHeader icon={Sparkles} subtitle="Simple, rapide et efficace" highlight="">	
			En trois étapes simples, connectez-vous avec votre communauté locale
		</SectionHeader>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
					{#each HOW_IT_WORKS_STEPS as step}
			<HowItWorksStep {...step} />
		{/each}
		</div>
	</div>
</section> 