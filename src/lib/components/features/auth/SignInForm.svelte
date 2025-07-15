<script lang="ts">
	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import { signInWithGoogle as signInService } from '$lib/services/auth.service';
	import BackButton from '$lib/components/ui/BackButton.svelte';
	import Logo from '$lib/components/ui/logo.svelte';
	import BenefitList from '$lib/components/ui/BenefitList.svelte';
	import navigation from '$lib/services/navigation.service';
	import GoogleIcon from '$lib/components/ui/GoogleIcon.svelte';
	import { LINK_BUTTON_CLASS } from '$lib/constants';

	let loading = $state(false);
	let error = $state<string | null>(null);

	async function handleSignIn() {
		const callbackUrl = $page.url.searchParams.get('callbackUrl');

		loading = true;
		error = null;
		try {
			await signInService(callbackUrl);
		} catch (e: any) {
			error = e.message || 'Une erreur inconnue est survenue lors de la connexion.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="space-y-8">
	<div class="flex justify-center space-x-4">
		<Logo size="xl" />
	</div>

	<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 space-y-6">
		<button
			onclick={handleSignIn}
			disabled={loading}
			class="group relative w-full flex items-center justify-center px-6 py-4 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
		>
			{#if loading}
				<LoadingSpinner size="sm" color="primary" />
				<span class="ml-3 font-medium">Connexion en cours...</span>
			{:else}
				<GoogleIcon />
				<span class="font-medium">Continuer avec Google</span>
			{/if}
		</button>

		{#if error}
			<div class="text-red-500 text-sm text-center">{error}</div>
		{/if}

		<div class="space-y-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
			<h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
				Pourquoi se connecter ?
			</h3>
			<BenefitList
				benefits={[
					'Proposer et demander des services',
					'Messagerie sécurisée avec vos voisins',
					'Gestion de vos favoris et rendez-vous'
				]}
			/>
		</div>

		<div class="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
			<p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
				En vous connectant, vous acceptez nos
				<button
					onclick={navigation.goToNotImplemented}
					class={LINK_BUTTON_CLASS}
					>conditions d'utilisation</button
				>
				et notre
				<button
					onclick={navigation.goToNotImplemented}
					class={LINK_BUTTON_CLASS}
					>politique de confidentialité</button
				>.
			</p>
		</div>
	</div>

	<div class="text-center space-y-3">
		<div class="mt-8 text-center">
			<BackButton onclick={navigation.goToHome} text="Retour à l'accueil" />
		</div>

		<div class="text-xs text-gray-500 dark:text-gray-400">
			Pas de compte nécessaire • Connexion instantanée
		</div>
	</div>
</div> 