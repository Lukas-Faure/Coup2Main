<script lang="ts">
    import type { Offre } from "$lib/types/offres";
    import { categoryConfig, typeConfig } from "$lib/constants";
    import { badgeColorClasses } from "$lib/constants/ui";
    import FavorisButton from "$lib/components/features/favoris/FavorisButton.svelte";
    import { authStore } from "$lib/stores/auth.store";

    let { offre }: { offre: Offre } = $props();

    const typeInfo = $derived(
        typeConfig[offre.type as keyof typeof typeConfig] || typeConfig.proposition,
    );
    const categoryInfo = $derived(
        categoryConfig[offre.category] || categoryConfig.autre,
    );
    const isOwnOffre = $derived($authStore.session.user.id === offre.user.id);
    const isAuthenticated = $derived(!!$authStore.session);
    const canAddToFavoris = $derived(isAuthenticated && !isOwnOffre);
</script>

<div
    class="absolute -top-6 -right-6 w-44 h-44 rounded-full flex items-center justify-center bg-{categoryInfo.colorTheme}-500/10 dark:bg-{categoryInfo.colorTheme}-900/20"
>
    {#if categoryInfo.icon}
        {@const IconComponent = categoryInfo.icon}
        <IconComponent class="w-10 h-10 text-{categoryInfo.colorTheme}-600 dark:text-{categoryInfo.colorTheme}-300 opacity-90" />
    {/if}
</div>

<div class="relative p-5 pb-3 flex-shrink-0">
    <div class="flex justify-between items-start mb-4">
        <div
            class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-sm
            {badgeColorClasses[typeInfo.colorTheme]} shadow-sm"
        >
            {#if typeInfo.icon}
                {@const IconComponent = typeInfo.icon}
                <IconComponent class="mr-1.5 w-4 h-4" />
            {/if}
            {typeInfo.label}
        </div>

        {#if canAddToFavoris}
            <div class="flex-shrink-0">
                <FavorisButton offreId={offre.id} ownerId={offre.user.id} />
            </div>
        {/if}
    </div>
</div> 