<script lang="ts">
	import type { Conversation } from '$lib/types/chat'
	import { getTimeAgo } from '$lib/utils/date';
	import { truncate } from '$lib/utils/string';
	import { authStore } from '$lib/stores/auth.store';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { DocumentText, ChevronRight } from 'svelte-heros-v2';
	import { sizeValue, AvatarShape } from '$lib/constants/ui';

	
	let { conversation, index } = $props<{
		conversation: Conversation;
		index: number;
	}>();
</script>

<button
	onclick={() => navigation.goToConversation(conversation.otherUser.id, conversation.offreId)}
	class="group block w-full text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 hover:scale-[1.01] hover:shadow-lg"
	style="animation: fadeIn 0.3s ease-out {index * 100}ms both;"
>
	<div class="p-6">
		<div class="flex items-center space-x-4">
			<Avatar
				src={conversation.otherUser.image}
				name={conversation.otherUser.name}
				size={sizeValue.LG}
				shape={AvatarShape.SQUARE}
			/>

			<div class="flex-1 min-w-0">
				<div class="flex items-center justify-between mb-2">
					<h3
						class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
					>
						{conversation.otherUser.name}
					</h3>
					<span
						class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-lg flex-shrink-0 ml-2"
					>
						{getTimeAgo(conversation.lastMessage.createdAt)}
					</span>
				</div>

				{#if conversation.offre}
					<div
						class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700/30 mb-2"
					>
						<DocumentText class="h-4 w-4 mr-1.5" />
						{conversation.offre.title}
					</div>
				{/if}

				<div class="flex items-center space-x-2">
					{#if conversation.lastMessage.fromUserId === $authStore.session.user.id}
						<span class="text-xs text-gray-500 dark:text-gray-400 font-medium">Vous:</span>
					{/if}
					<p class="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
						{truncate(conversation.lastMessage.content, 60)}
					</p>
				</div>
			</div>

			<div class="flex-shrink-0">
				<div
					class="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors"
				>
					<ChevronRight
						class="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
					/>
				</div>
			</div>
		</div>
	</div>
</button> 