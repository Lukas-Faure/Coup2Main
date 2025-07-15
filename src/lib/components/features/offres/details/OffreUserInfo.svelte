<script lang="ts">
    import { formatDate } from "$lib/utils/date";
    import type { Offre } from "$lib/types/offres";
    import type { Snippet } from "svelte";
    import { MapPin } from "svelte-heros-v2";
    let { offre, actions } = $props<{ offre: Offre; actions: Snippet }>();
</script>

<div
    class="flex items-center justify-between mb-8 p-6 bg-gray-50/70 dark:bg-gray-700/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/50"
>
    <div class="flex items-center space-x-4">
        {#if offre.user?.image}
            <img
                src={offre.user.image}
                alt={offre.user.name || "Avatar"}
                class="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
            />
        {:else}
            <div
                class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-lg"
            >
                <span class="text-white font-bold text-xl">
                    {offre.user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
            </div>
        {/if}
        <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                {offre.user?.name || "Utilisateur anonyme"}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <MapPin class="h-4 w-4 mr-2" aria-hidden="true" />
                {offre.location}
            </p>
            <p class="text-sm text-gray-500 mt-1">
                Publié le {formatDate(offre.createdAt)}
            </p>
        </div>
    </div>

    {@render actions()}
</div>
