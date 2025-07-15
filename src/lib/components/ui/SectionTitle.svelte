<script lang="ts">
	import type { Snippet } from 'svelte';

	let { className = '', children }: { className: string, children: Snippet } = $props();
</script>
 
<h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 {className}">
	{@render children()}
</h3> 