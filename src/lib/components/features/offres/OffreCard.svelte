<script lang="ts">
    import { navigation } from "$lib/services/navigation.service";
    import type { Offre } from "$lib/types/offres";
    import OffreCardHeader from "./OffreCardHeader.svelte";
    import OffreCardContent from "./OffreCardContent.svelte";
    import OffreCardUserInfo from "./OffreCardUserInfo.svelte";
    import OffreCardActions from "./OffreCardActions.svelte";

    let { offre }: {
        offre: Offre;
    } = $props();

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigation.goToOffre(offre.id);
        }
    }
</script>

<div
    class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1 flex flex-col min-h-[400px]"
>
    <OffreCardHeader {offre} />

    <button
        class="flex flex-col flex-grow cursor-pointer"
        onclick={() => navigation.goToOffre(offre.id)}
        onkeydown={handleKeyDown}
        tabindex="0"
        aria-label="Voir l'offre: {offre.title}"
    >
        <OffreCardContent {offre} />
    </button>

    <OffreCardUserInfo {offre} />

    <OffreCardActions {offre} />

    <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none"
    ></div>
</div>
