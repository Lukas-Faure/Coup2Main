<script lang="ts">
	import type { Component } from 'svelte';

    let {
        title,
        value,
        icon,
        color,
    }: {
        title: string;
        value: number;
        icon: Component;
        color: string;
    } = $props();
</script>

<div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-md transition-shadow duration-200"
>
    <div class="flex items-center justify-between">
        <div class="flex-1">
            <p
                class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
                {title}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
            </p>
        </div>
        <div class="flex-shrink-0">
            {#if icon}
                {@const IconComponent = icon}
                <div
                    class="w-12 h-12 bg-{color}-100 dark:bg-{color}-900/30 rounded-lg flex items-center justify-center"
                >
                    <IconComponent
                        class="w-6 h-6 text-{color}-600 dark:text-{color}-400"
                    />
                </div>
            {/if}
        </div>
    </div>
</div>
