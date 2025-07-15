<script lang="ts">
    import type { Offre } from "$lib/types/offres";
    import { categoryConfig } from "$lib/constants";
    import { truncate } from "$lib/utils/string";
    
    let { offre }: { offre: Offre } = $props();

    const categoryInfo = $derived(
        categoryConfig[offre.category] || categoryConfig.autre,
    );


</script>

<div class="px-5 pb-5 flex flex-col flex-grow">
    <div class="flex items-center mb-3">
        {#if categoryInfo.icon}
            {@const IconComponent = categoryInfo.icon}
            <IconComponent class="text-lg mr-2" />
        {/if}
        <span
            class="text-xs font-medium uppercase tracking-wide {categoryInfo.color} {categoryInfo.darkColor}"
        >
            {categoryInfo.label}
        </span>
    </div>

    <h3
        class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 leading-tight line-clamp-2"
    >
        {offre.title}
    </h3>

    <p
        class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3"
    >
        {truncate(offre.description, 120)}
    </p>
</div> 