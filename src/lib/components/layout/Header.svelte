<script lang="ts">
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.store';
	import { themeStore } from '$lib/stores/theme.store';
	import ThemeToggle from '../ui/ThemeToggle.svelte';
	import ProfileMenu from './ProfileMenu.svelte';
	import LoginButton from '../ui/LoginButton.svelte';
	import DesktopNav from './DesktopNav.svelte';
	import Logo from '../ui/logo.svelte';
	import {
		MAIN_NAV_ITEMS,
		ACTIVITY_NAV_ITEMS,
		MANAGEMENT_NAV_ITEMS
	} from '$lib/constants';
	import { navigation } from '$lib/services/navigation.service';

	themeStore.initialize();

	let currentPath = $derived($page.url.pathname);
	let scrolled = $state(false);
</script>

<svelte:window on:scroll={() => (scrolled = window.scrollY > 10)} />

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'}">
	<div class="w-full px-6">
		<nav class="grid grid-cols-3 items-center h-16 w-full" aria-label="Navigation principale">
			<div class="flex items-center justify-start">
				<button
					onclick={navigation.goToHome}
					class="group flex items-center space-x-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl p-1"
					aria-label="Coup2Main - Retour à l'accueil"
				>
					<Logo />
				</button>
			</div>

			<DesktopNav items={MAIN_NAV_ITEMS} {currentPath} />

			<div class="flex items-center justify-end space-x-3" role="group" aria-label="Actions utilisateur">
				<ThemeToggle />

				{#if $authStore.session}
					<ProfileMenu activityNavItems={ACTIVITY_NAV_ITEMS} managementNavItems={MANAGEMENT_NAV_ITEMS} />
				{:else}	
					<LoginButton />
				{/if}
			</div>
		</nav>
	</div>
</header>

<div class="h-16" aria-hidden="true"></div> 