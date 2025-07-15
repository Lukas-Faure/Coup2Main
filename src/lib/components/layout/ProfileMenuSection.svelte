<script lang="ts">
    import ProfileMenuItem from './ProfileMenuItem.svelte';

    let {
        title,
        items,
        closeMenu,
        itemType,
    }: {
        title: string;
        items: any[];
        closeMenu: () => void;
        itemType: 'default' | 'danger';
    } = $props();
</script>

<div class="py-1">
    <div
        class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
    >
        {title}
    </div>
    {#each items as item}
        <ProfileMenuItem {item} onItemClick={closeMenu} type={itemType} />
    {/each}
</div> 