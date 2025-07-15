<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.store';
	import type { Message } from '$lib/types/chat';
	import type { UserInfo } from '$lib/types/app';
	import type { Offre } from '$lib/types/offres';
	import { loadConversation as loadConversationService } from '$lib/services/conversation.service';

	import ChatHeader from '$lib/components/features/chat/ChatHeader.svelte';
	import MessageBubble from '$lib/components/features/chat/MessageBubble.svelte';
	import ChatInput from '$lib/components/features/chat/ChatInput.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import FeedbackMessage from '$lib/components/ui/FeedbackMessage.svelte';
	import { sendMessage as sendMessageService } from '$lib/services/message.service';

	let { data } = $props();

	let messageContainer = $state<HTMLElement | null>(null);

	let messages = $state<Message[]>([]);
	let interlocutor = $state<UserInfo | null>(null);
	let offre = $state<Offre | null>(null);
	let sending = $state(false);
	let loading = $state(false);
	let error = $state<string | null>(null);

	const userId = $derived($page.params.userId);
	const offreId = $derived($page.url.searchParams.get('offre'));

	async function loadConversation(id: string, offerId?: string | null) {
		loading = true;
		error = null;
		try {
			const conversationData = await loadConversationService(id, offerId || undefined);
				messages = conversationData.messages || [];
				interlocutor = conversationData.interlocutor;
				offre = conversationData.offre;
		} catch (e: any) {
			error = e.message || 'Erreur de connexion';
		} finally {
			loading = false;
		}
	}

	async function sendMessage(content: string) {
		if (content.trim() && interlocutor && $authStore.session?.user?.id) {
		sending = true;

		const tempId = `temp_${Date.now()}`;
		const newMessage: Message = {
			id: tempId,
			content,
			toUserId: interlocutor.id,
			fromUserId: $authStore.session.user.id,
			offreId: offre?.id || null,
			createdAt: new Date(),
			read: false,
			fromUser: {
				name: $authStore.session.user.name,
				image: $authStore.session.user.image
			}
		};

		messages.push(newMessage);

		try {
			const response = await sendMessageService({
				toUserId: interlocutor.id,
				content,
				offreId: offre?.id
			});

			if (response.ok) {
				const savedMessage = await response.json();
				const index = messages.findIndex(m => m.id === tempId);
				if (index !== -1) {
					messages[index] = savedMessage;
				}
			} else {
				messages.pop();
				error = "Erreur lors de l'envoi du message";
			}
		} catch (e) {
			messages.pop();
			error = "Erreur de connexion";
		} finally {
			sending = false;
			}
		}
	}

	function scrollToBottom() {
		if (messageContainer) {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		}
	}

	onMount(async () => {
		if (userId && ($authStore.session || data.session)) {
			await loadConversation(userId, offreId);
			scrollToBottom();
		}
	});

	// Auto-scroll quand de nouveaux messages arrivent
	$effect(() => {
		if (messages.length > 0) {
			scrollToBottom();
		}
	});
</script>

<svelte:head>
	<title>Conversation avec {interlocutor?.name || 'un utilisateur'}</title>
</svelte:head>

<div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
	{#if loading}
		<div class="flex-1 flex items-center justify-center">
			<LoadingSpinner size="lg" color="primary" />
		</div>
	{:else if error}
		<div class="flex-1 flex items-center justify-center p-4">
			<FeedbackMessage type="error" message={error} position="inline" />
		</div>
	{:else if interlocutor}
		<ChatHeader {interlocutor} {offre} />

		<main bind:this={messageContainer} class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
			{#each messages as message (message.id)}
				<MessageBubble {message} interlocutorImage={interlocutor?.image ?? ''} />
			{/each}
		</main>

		<ChatInput onSubmit={sendMessage} loading={sending} />	
	{:else}
		<div class="flex-1 flex items-center justify-center">
			<p>Conversation introuvable ou vous n'êtes pas connecté.</p>
		</div>
	{/if}
</div> 