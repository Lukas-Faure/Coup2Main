<script lang="ts">
    import type { SelectionCardOption } from "$lib/types/components";
    import { Check } from "svelte-heros-v2";

    let { options, selectedValue, onSelect } = $props<{
        options: SelectionCardOption[];
        selectedValue: string;
        onSelect: (value: string) => void;
    }>();
</script>

<ul class="max-h-72 overflow-y-auto">
    {#each options as option}
        <li>
            <button
                type="button"
                onclick={() => onSelect(option.value)}
                class="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between {option.value === selectedValue
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : ''}"
            >
                <div class="flex items-center space-x-3">
                    {#if option.icon}
                        {@const IconComponent = option.icon}
                        <IconComponent class="w-4 h-4 {option.value === selectedValue ? 'text-primary-500' : ''}" />
                    {/if}
                    <span class="text-gray-800 dark:text-gray-200"
                        >{option.label}</span
                    >
                </div>
                {#if option.value === selectedValue}
                    <Check class="h-4 w-4 text-primary-500" aria-hidden="true" />
                {/if}
            </button>
        </li>
    {/each}
</ul> 