<script lang="ts">
	import { XCircle, CheckCircle, ExclamationTriangle, LightBulb } from 'svelte-heros-v2';
	
	let { title = $bindable(), type, suggestions, validationError, onUpdateTitle } = $props<{
		title: string;
		type: string;
		suggestions: string[];
		validationError: string | undefined;
		onUpdateTitle: (title: string) => void;
	}>();

	let showTitleSuggestions = $state(false);

	const titleValid = $derived(title.trim().length >= 5 && title.trim().length <= 100); 

	function useTitleSuggestion(suggestion: string) {
		title = suggestion;
		showTitleSuggestions = false;
		onUpdateTitle(title); 
	}
</script>

<div class="p-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Donnez un titre accrocheur</h2>
		<p class="text-lg text-gray-600 dark:text-gray-300">Un bon titre attire l'attention et explique clairement votre offre</p>
	</div>
	
	<div class="max-w-2xl mx-auto">
		{#if suggestions.length > 0}
			<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
				<div class="flex items-center justify-between mb-3">
					<h4 class="font-medium text-blue-900 dark:text-blue-300">
						<LightBulb class="inline-block w-5 h-5 mr-2" /> Suggestions de titres :
					</h4>
					<button type="button" onclick={() => showTitleSuggestions = !showTitleSuggestions} class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium">
						{showTitleSuggestions ? 'Masquer' : 'Voir les idées'}
					</button>
				</div>
				{#if showTitleSuggestions}
					<div class="space-y-2">
						{#each suggestions as suggestion}
							<button type="button" onclick={() => useTitleSuggestion(suggestion)} class="w-full text-left p-3 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm text-gray-900 dark:text-gray-100">
								{suggestion}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		
		<div class="relative">
			<input
				type="text"
				bind:value={title}
				placeholder={type === 'proposition' ? 'Ex: Aide pour déménagement le weekend' : 'Ex: Recherche aide pour jardinage'}
				class="w-full px-6 py-4 text-lg border-2 rounded-2xl focus:ring-0 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 {validationError ? 'border-red-300 dark:border-red-600 focus:border-red-500' : title.length > 0 && titleValid ? 'border-green-300 dark:border-green-600 focus:border-green-500' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500'}"
				maxlength="100"
			/>
			<div class="absolute right-4 top-4 text-sm text-gray-400 dark:text-gray-500">
				{title.length}/100
			</div>
		</div>
		
		{#if validationError}
			<div class="mt-2 flex items-center space-x-2 text-red-600">
				<XCircle class="w-4 h-4" />
				<span class="text-sm">{validationError}</span>
			</div>
		{:else if title.length > 0}
			{#if titleValid}
				<div class="mt-2 flex items-center space-x-2 text-green-600">
					<CheckCircle class="w-4 h-4" />
					<span class="text-sm">Parfait ! Ce titre est suffisant</span>
				</div>
			{:else if title.length < 5}
				<div class="mt-2 flex items-center space-x-2 text-orange-600">
					<ExclamationTriangle class="w-4 h-4" />
					<span class="text-sm">Encore {5 - title.length} caractères minimum</span>
				</div>
			{/if}
		{/if}
	</div>
</div> 