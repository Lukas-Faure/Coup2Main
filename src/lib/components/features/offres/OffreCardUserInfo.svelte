<script lang="ts">
    import type { Offre } from "$lib/types/offres";
    import { formatDate } from "$lib/utils/date";
    import Avatar from "$lib/components/ui/Avatar.svelte";
    import { AvatarShape } from "$lib/constants/ui";
    import { MapPin } from "svelte-heros-v2";

    let { offre }: { offre: Offre } = $props();
</script>

<div
    class="flex items-center justify-between mb-2 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex-shrink-0 px-5 pb-3"
>
    <div class="flex items-center space-x-3 min-w-0 flex-1">
        <Avatar
            src={offre.user.image || ''}
            name={offre.user.name || 'Utilisateur anonyme'}
            size="sm"
            shape={AvatarShape.CIRCLE}
        />
        <div class="min-w-0 flex-1">
            <p
                class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
            >
                {offre.user.name || "Utilisateur"}
            </p>
            <p
                class="text-xs text-gray-500 dark:text-gray-400 flex items-center truncate"
            >
                <MapPin class="w-3 h-3 mr-1" />
                {offre.location}
            </p>
        </div>
    </div>

    <div class="text-right flex-shrink-0 ml-2">
        <span
            class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400"
        >
            {formatDate(new Date(offre.createdAt))}
        </span>
    </div>
</div> 