<script lang="ts">
	import { componentVisualStyles, ButtonSize } from '$lib/constants/ui';
	let { size = ButtonSize.MD }: { size?: keyof typeof componentVisualStyles } = $props();


	const currentSize = $derived(componentVisualStyles[size] || componentVisualStyles.md);
</script>

<div class="relative">
	<div
		class="bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 {currentSize.wrapper}"
	>
		<span class="text-white font-bold {currentSize.text}" aria-hidden="true">C2M</span>
    </div>
	<div
		class="absolute bg-green-400 rounded-full animate-pulse {currentSize.pulse}"
		title="Service en ligne"
	></div>
</div>
<div class="flex flex-col">
	<span
		class="font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent {currentSize.title}"
	>
        Coup2Main
    </span>
	<span class="text-gray-500 dark:text-gray-400 -mt-1 {currentSize.subtitle}"
		>Entraide locale</span
	>
</div>