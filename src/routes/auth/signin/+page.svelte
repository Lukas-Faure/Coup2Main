<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme.store';
	import SignInForm from '$lib/components/features/auth/SignInForm.svelte';

	onMount(() => {
		themeStore.initialize();
	});
</script>

<svelte:head>
	<title>Connexion - Coup2Main</title>
	<meta
		name="description"
		content="Connectez-vous à Coup2Main pour rejoindre la communauté d'entraide locale"
	/>
</svelte:head>

<main
	class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
>
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div
			class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse"
		></div>
		<div
			class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse"
			style="animation-delay: 1s;"
		></div>
	</div>

	<div class="relative z-10 max-w-md w-full">
		<SignInForm />
	</div>
</main>

 