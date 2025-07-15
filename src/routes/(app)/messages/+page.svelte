<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { getConversations } from '$lib/services/conversation.service';
	import type { Conversation } from '$lib/types/chat';
	import { goToLogin, navigation } from '$lib/services/navigation.service';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import ConversationCard from '$lib/components/features/conversations/ConversationCard.svelte';
	import TipBox from '$lib/components/ui/TipBox.svelte';
	import { ChatBubbleLeftRight, MagnifyingGlass, LightBulb } from 'svelte-heros-v2';
	import { DEFAULT_ERROR_MESSAGE } from '$lib/constants';
	
	let loading = $state(true);
	let error = $state<string | null>(null);
	let conversations = $state<Conversation[]>([]);

	async function load() {
		loading = true;
		error = null;
		try {
			conversations = await getConversations();
		} catch (e: any) {
			error = e.message || DEFAULT_ERROR_MESSAGE;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if ($authStore.session) {
			load();
		} else {
			goToLogin();
		}
	});

</script>

<svelte:head>
	<title>Messages - Coup2Main</title>
	<meta name="description" content="Gérez vos conversations avec la communauté Coup2Main" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<PageHeader 
			title="Vos conversations"
			subtitle="Restez en contact avec votre communauté et coordonnez vos services d'entraide"
			badgeText="Mes conversations"
			badgeColor="emerald"
			gradient="from-emerald-600 to-green-600"
			icon={ChatBubbleLeftRight}
		/>

		{#if loading}
			<div class="flex items-center justify-center py-20">
				<LoadingSpinner size="lg" color="primary" />
			</div>
		{:else if error}
			<div class="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
				<div class="flex items-center justify-between">
					<p class="text-red-700 dark:text-red-300">{error}</p>
					<button 
						onclick={load}
						class="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
					>
						Réessayer
					</button>
				</div>
			</div>
		{:else if conversations.length === 0}
			<EmptyState 
				icon={ChatBubbleLeftRight}
				title={'Aucune conversation'}
				description={'Vous n\'avez pas encore de messages. Contactez vos voisins via leurs offres pour commencer à échanger !'}
				actions={[{
					label: 'Découvrir les offres',
					onClick: navigation.goToHome,
					icon: MagnifyingGlass
				}]}
			/>
		{:else}
		<div
		class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden"
	>
			{#each conversations as conversation, index}
				<ConversationCard {conversation} {index} />
			{/each}
			</div>
			
			<div class="mt-12 text-center">
				<TipBox icon={LightBulb} title="Astuce">Répondez rapidement pour maintenir une bonne relation avec vos voisins</TipBox>	
			</div> 
		{/if}
	</div>
</main>