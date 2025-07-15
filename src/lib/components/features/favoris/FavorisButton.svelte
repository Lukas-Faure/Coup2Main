<script lang="ts">
    import { favoris } from "$lib/stores/favoris.store";
    import { authStore } from "$lib/stores/auth.store";
    import navigation from "$lib/services/navigation.service";
    import { Heart } from "svelte-heros-v2";
    let { offreId, ownerId } = $props<{
        offreId: string;
        ownerId: string;
    }>();

    let isFavori = $derived($favoris.includes(offreId));

    let loading = $state(false);
    let currentUserId = $state($authStore.session?.user?.id);

    let isOwner = $derived(currentUserId === ownerId);

    async function toggleFavori(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        if ($authStore.session) {
            loading = true;
            try {
                favoris.toggle(offreId);
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour du favori:",
                    error,
                );
            } finally {
                loading = false;
            }
        } else {
            navigation.goToLogin();
            return;
        }
    }
</script>

{#if !isOwner}
    <button
        onclick={toggleFavori}
        disabled={loading}
        class="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200
			{isFavori
				? 'bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
				: 'bg-white/70 text-gray-700 hover:bg-white backdrop-blur-sm dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800'}"
        aria-label={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
        <Heart
            variation={isFavori ? "solid" : "outline"}
            class="h-6 w-6"
            aria-hidden="true"
        />
    </button>
{/if}
