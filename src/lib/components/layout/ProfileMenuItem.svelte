<script lang="ts">
    let {
        item,
        onItemClick,
        type,
    }: {
        item: { label: string; icon?: any; onClick: () => void };
        onItemClick: () => void;
        type: "default" | "danger";
    } = $props();

    const buttonClasses = $derived(
        type === "danger"
            ? "text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
    );
</script>

<button
    onclick={() => {
        item.onClick();
        onItemClick();
    }}
    class="{buttonClasses} flex items-center space-x-3 w-full px-4 py-2 text-sm transition-colors duration-150"
>
    {#if item.icon}
        {@const IconComponent = item.icon}
        <IconComponent class="w-4 h-4" />
    {/if}
    <span>{item.label}</span>
</button>
