<script lang="ts">
  import { authStore } from "$lib/stores/auth.store";
  import type { Message } from "$lib/types/chat";
  import { formatDate } from "$lib/utils/date";

  let { message, interlocutorImage } = $props<{
    message: Message;
    interlocutorImage: string;
  }>();

  const isMe = $derived(message.fromUserId === $authStore.session?.user?.id);
</script>

<div class="flex items-start gap-3" class:flex-row-reverse={isMe}>
  {#if !isMe}
    {#if interlocutorImage}
      <img src={interlocutorImage} alt="Avatar" class="w-8 h-8 rounded-full" />
    {:else}
      <div
        class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"
      ></div>
    {/if}
  {/if}
  <div
    class="max-w-xs md:max-w-md p-3 rounded-2xl"
    class:bg-primary-500={isMe}
    class:text-white={isMe}
    class:dark:bg-primary-600={isMe}
    class:bg-gray-100={!isMe}
    class:dark:bg-gray-700={!isMe}
  >
    <p class="text-sm {isMe ? '' : 'text-gray-900 dark:text-gray-100'}">{message.content}</p>
    <p
      class="text-xs mt-1"
      class:text-gray-300={isMe}
      class:dark:text-gray-400={isMe}
      class:text-gray-500={!isMe}
    >
      {formatDate(message.createdAt)}
    </p>
  </div>
</div>
