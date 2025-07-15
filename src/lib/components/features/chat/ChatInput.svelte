<script lang="ts">
	import { PaperAirplane } from 'svelte-heros-v2';

	let { onSubmit, loading } : {onSubmit: (message: string) => void, loading: boolean} = $props();
	let content = $state('');

	function handleSubmit() {
		if (content.trim()) {
			onSubmit(content);
			content = '';
		}
	}
</script>

<form onsubmit={handleSubmit} class="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
	<div class="relative">
		<input
			type="text"
			bind:value={content}
			placeholder="Écrivez votre message..."
			disabled={loading}
			class="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
		/>
		<button
			type="submit"
			disabled={loading || !content.trim()}
			class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{#if loading}
				<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
			{:else}
				<PaperAirplane class="h-5 w-5" />
			{/if}
		</button>
	</div>
</form> 