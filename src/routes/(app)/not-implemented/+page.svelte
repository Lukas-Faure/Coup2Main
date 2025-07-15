<script lang="ts">
	import BackButton from '$lib/components/ui/BackButton.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import {InformationCircle} from 'svelte-heros-v2';
</script>

<div class="flex items-center justify-center min-h-[60vh]">
	<div
		class="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 sm:p-12 max-w-lg mx-auto"
	>
		<div
			class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
		>
			<InformationCircle class="h-16 w-16 text-blue-600 dark:text-blue-400" aria-hidden="true" />	
		</div>
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
			Fonctionnalité non réalisée
		</h1>
		<p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
			Pour ce projet de démonstration, l'accent a été mis sur les fonctionnalités principales.
			Cette page n'a donc volontairement pas été développée.
		</p>
		<BackButton onclick={navigation.goToHome} text="Retour à l'accueil" />	
	</div>
</div> 