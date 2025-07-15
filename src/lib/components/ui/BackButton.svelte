<script lang="ts">
	import { ArrowLeft } from 'svelte-heros-v2';	
	let { text = 'Retour', onclick = () => {} } = $props<{	
		text?: string;
		onclick?: (event: MouseEvent) => void;
	}>();

	function handleClick(event: MouseEvent) {
		if (onclick) {
			onclick(event);
		}
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
>
	<ArrowLeft class="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />	
	{text}
</button> 