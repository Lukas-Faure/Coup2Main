<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.store';
	import { themeStore } from '$lib/stores/theme.store';
	import { onMount } from 'svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import { browser } from '$app/environment';
	
	let { children } = $props();

	let showDemoPopup = $state(false);

	$effect(() => {
		if ($page.data.session !== undefined) {
			authStore.setSession($page.data.session);
		}
	});

	onMount(() => {
		themeStore.initialize();
		if (browser) {
			const hasSeenDemoPopup = localStorage.getItem('hasSeenDemoPopup');
			if (!hasSeenDemoPopup) {
				showDemoPopup = true;
			}
		}
	});

	function handleConfirm() {
		showDemoPopup = false;
		if (browser) {
			localStorage.setItem('hasSeenDemoPopup', 'true');
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
	
	<Header />
	
	<main class="flex-1 relative py-8">
		<div class="fixed inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse"></div>
			<div class="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
			<div class="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/5 dark:bg-blue-400/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
		</div>

		<div class="relative z-10">
			{@render children()}
		</div>
	</main>
	
	<Footer />

	<ConfirmModal
		isOpen={showDemoPopup}
		title="Site Démonstratif"
		message="Ceci est un site de démonstration. Toutes les informations sont fictives et ne représentent pas de vraies personnes ou relations. Il ne s'agit pas d'une plateforme pour mettre en relation des individus."
		onConfirm={handleConfirm}
		confirmButtonText="Compris"
	/>
</div>