<script lang="ts">
	import type { Offre } from '$lib/types/offres';
	import type { UserInfo } from '$lib/types/app';
	import BackButton from '$lib/components/ui/BackButton.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { ArrowRight } from 'svelte-heros-v2';

	let { interlocutor, offre } = $props<{
		interlocutor: UserInfo;
		offre: Offre | null;
	}>();
</script>

<header
	class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl sticky top-0 z-10 p-4 border-b border-gray-200 dark:border-gray-700">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<BackButton onclick={navigation.goToMessages} text="Messages" />
			<div class="flex items-center space-x-3">
				<Avatar src={interlocutor.image} name={interlocutor.name} size="md" shape="circle" />
				<div>
					<h1 class="font-bold text-gray-900 dark:text-white">{interlocutor.name}</h1>
				</div>
			</div>
		</div>

		{#if offre}
			<button
				onclick={() => navigation.goToOffre(offre.id)}
				class="text-sm font-medium text-primary-600 hover:underline hidden md:flex items-center space-x-2"
			>
				<span>Voir l'offre : {offre.title}</span>
				<ArrowRight class="h-4 w-4" />
			</button>
		{/if}
	</div>
</header> 