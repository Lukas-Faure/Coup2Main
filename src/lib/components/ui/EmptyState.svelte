<script lang="ts">
    import Button from "$lib/components/ui/buttons/Button.svelte";
    import type { Component } from "svelte";
    import type { EmptyStateAction } from "$lib/types/components";

    let {
        image,
        icon,
        title,
        description,
        actions,
    }: {
        image?: string;
        icon?: Component;
        title: string;
        description: string;
        actions?: EmptyStateAction[];
    } = $props();
</script>

<div class="text-center py-20">
    {#if image}
        <div class="mb-8">
            <img
                src={image}
                alt=""
                class="w-64 h-64 mx-auto opacity-60"
            />
        </div>
    {:else if icon}
        {@const IconComponent = icon}
        <div class="mb-8">
            <IconComponent class="w-24 h-24 mx-auto opacity-60" />
        </div>
    {/if}

    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
    </h3>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        {description}
    </p>

    {#if actions && actions.length > 0}
        <div class="flex flex-wrap gap-4 justify-center">
            {#each actions as action}
                <Button
                    buttonStyle={action.buttonStyle}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    icon={action.icon}
                >
                    {action.label}
                </Button>
            {/each}
        </div>
    {/if}
</div>
