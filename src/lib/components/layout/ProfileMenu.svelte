<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { authStore } from '$lib/stores/auth.store';
	import { fly } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { ChevronDown, ArrowRight } from 'svelte-heros-v2';
	import ProfileMenuItem from './ProfileMenuItem.svelte';
	import UserAvatar from './UserAvatar.svelte';
	import ProfileMenuSection from './ProfileMenuSection.svelte';
	import { sizeValue } from '$lib/constants/ui';

	let {
		activityNavItems,
		managementNavItems,
	} = $props<{
		activityNavItems: any[];
		managementNavItems: any[];
	}>();

	let profileMenuOpen = $state(false);

	function toggleProfileMenu() {
		profileMenuOpen = !profileMenuOpen;
	}

	function closeProfileMenu() {
		profileMenuOpen = false;
	}

	const logoutItem = { label: 'Se déconnecter', icon: ArrowRight, onClick: signOut };
</script>

<div class="relative" use:clickOutside={closeProfileMenu}>
	<button
		onclick={toggleProfileMenu}
		class="profile-button group flex items-center space-x-3 px-3 py-2 rounded-xl bg-gray-50/60 dark:bg-gray-800/60 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200/30 dark:border-gray-700/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
		title="Menu profil - {$authStore.session?.user?.name || 'Utilisateur'}"
		aria-expanded={profileMenuOpen}	
		aria-haspopup="true"
		aria-label="Menu du profil utilisateur"
	>
		<UserAvatar imageUrl={$authStore.session.user.image} userName={$authStore.session.user.name} size={sizeValue.SM} />
		<div class="hidden sm:block text-left">
			<div class="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
				{$authStore.session.user.name.split(' ')[0] || 'Utilisateur'}
			</div>
			<div class="text-xs text-success-600 dark:text-success-400 leading-tight">Connecté</div>
		</div>
		<ChevronDown
			class="h-4 w-4 transition-transform duration-200 {profileMenuOpen ? 'rotate-180' : ''}"
			aria-hidden="true"
		/>
	</button>

	{#if profileMenuOpen}
		<div
			class="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl z-50"
			transition:fly={{ y: -10, duration: 200 }}
			role="menu"
			aria-label="Menu profil"
		>
			<div class="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
				<div class="flex items-center space-x-3">
					<UserAvatar imageUrl={$authStore.session.user.image} userName={$authStore.session.user.name} size={sizeValue.LG} />
					<div>
						<div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
							{$authStore.session.user.name || 'Utilisateur'}
						</div>
						<div class="text-xs text-gray-500 dark:text-gray-400">
							{$authStore.session.user.email || ''}
						</div>
					</div>
				</div>
			</div>

			<ProfileMenuSection title="Mon Activité" items={activityNavItems} closeMenu={closeProfileMenu} itemType="default" />

			<div class="border-t border-gray-200/50 dark:border-gray-700/50 py-1">
				<ProfileMenuSection title="Ma Gestion" items={managementNavItems} closeMenu={closeProfileMenu} itemType="default" />
			</div>

			<div class="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
				<ProfileMenuItem item={logoutItem} onItemClick={closeProfileMenu} type="danger" />
			</div>
		</div>
	{/if}
</div> 