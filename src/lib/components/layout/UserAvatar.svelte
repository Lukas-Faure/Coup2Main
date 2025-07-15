<script lang="ts">
    import { componentVisualStyles } from '$lib/constants/ui';

    let {
        imageUrl,
        userName,
        size,
    }: {
        imageUrl: string | undefined;
        userName: string;
        size: keyof typeof componentVisualStyles;
    } = $props();
</script>

<div class="relative">
    {#if imageUrl}
        <img
            src={imageUrl}
            alt=""
            class="{componentVisualStyles[size].wrapper} ring-2 ring-primary-200 dark:ring-primary-600 {size === 'sm' ? 'transition-all duration-200 group-hover:ring-primary-400 dark:group-hover:ring-primary-500' : ''}"
        />
    {:else}
        <div
            class="{componentVisualStyles[size].wrapper} bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold {componentVisualStyles[size].text} shadow-md ring-2 ring-primary-200 dark:ring-primary-600 {size === 'sm' ? 'transition-all duration-200 group-hover:ring-primary-400 dark:group-hover:ring-primary-500' : ''}"
        >
            {userName.charAt(0).toUpperCase() || 'U'}
        </div>
    {/if}
    {#if size === 'sm'}
        <div
            class="absolute {componentVisualStyles[size].pulse} bg-success-400 rounded-full border-2 border-white dark:border-gray-800"
            title="Connecté"
        ></div>
    {/if}
</div>