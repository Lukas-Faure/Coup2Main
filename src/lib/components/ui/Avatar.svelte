<script lang="ts">
    import {
        sizeClasses,
        shapeClasses,
        textSizeClasses,
        sizeValue,
        AvatarShape,
    } from "$lib/constants/ui";

    let {
        src,
        name,
        size = sizeValue.MD,
        shape = AvatarShape.CIRCLE,
        className,
    }: {
        src: string;
        name: string;
        size: (typeof sizeValue)[keyof typeof sizeValue];
        shape: (typeof AvatarShape)[keyof typeof AvatarShape];
        className?: string;
    } = $props();
</script>

{#if src}
    <img
        {src}
        alt={name || "Avatar"}
        class="object-cover shadow-lg ring-2 ring-gray-200/50 dark:ring-gray-600/50 {sizeClasses[
            size
        ]} {shapeClasses[shape]} {className}"
    />
{:else}
    <div
        class="bg-gradient-to-br from-primary-500 to-green-600 dark:from-primary-600 dark:to-green-700 flex items-center justify-center shadow-lg ring-2 ring-gray-200/50 dark:ring-gray-600/50 {sizeClasses[
            size
        ]} {shapeClasses[shape]} {className}"
    >
        <span class="text-white font-semibold {textSizeClasses[size]}">
            {(name || "U").charAt(0).toUpperCase()}
        </span>
    </div>
{/if}
