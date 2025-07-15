<script lang="ts">
    import Button from "$lib/components/ui/buttons/Button.svelte";
    import { ButtonSize, ButtonStyle } from "$lib/constants/ui";
    import { navigation } from "$lib/services/navigation.service";
    import type { Offre } from "$lib/types/offres";
    import { authStore } from "$lib/stores/auth.store";
    import ConfirmModal from "$lib/components/ui/ConfirmModal.svelte";
    import { offresStore } from "$lib/stores/offres.store";
    import { OffreServiceClient } from "$lib/services/offre.service";
    import {
        Eye,
        PencilSquare,
        Trash,
        ChatBubbleLeft,
        Key,
    } from "svelte-heros-v2";

    let {
        offre,
    }: {
        offre: Offre;
    } = $props();

    const isOwnOffre = $derived($authStore.session?.user?.id === offre.user.id);
    const isAuthenticated = $derived(!!$authStore.session);

    let showDeleteConfirm = $state(false);
    let deleteLoading = $state(false);

    async function handleDelete() {
        if (!deleteLoading) {
            deleteLoading = true;
            try {
                const response = await OffreServiceClient.deleteOffre(offre.id);

                if (response.ok) {
                    offresStore.removeOffre(offre.id);
                    showDeleteConfirm = false;
                }
            } catch (error) {
                console.error("Erreur de connexion");
            } finally {
                deleteLoading = false;
            }
        }
    }
</script>

<div class="flex gap-2 flex-shrink-0 justify-end px-5 pb-3">
    <Button
        onClick={(event) => {
            event.stopPropagation();
            navigation.goToOffre(offre.id);
        }}
        buttonStyle={ButtonStyle.OUTLINE}
        size={ButtonSize.XS}
        fullWidth={false}
        icon={Eye}
    ></Button>

    {#if isAuthenticated}
        {#if isOwnOffre}
            <Button
                onClick={(event) => {
                    event.stopPropagation();
                    navigation.goToEditOffer(offre.id);
                }}
                buttonStyle={ButtonStyle.OUTLINE}
                size={ButtonSize.XS}
                fullWidth={false}
                icon={PencilSquare}
            ></Button>
            <Button
                onClick={(event) => {
                    event.stopPropagation();
                    showDeleteConfirm = true;
                }}
                buttonStyle={ButtonStyle.RED_DANGER}
                size={ButtonSize.XS}
                fullWidth={false}
                icon={Trash}
            ></Button>
        {:else}
            <Button
                onClick={(event) => {
                    event.stopPropagation();
                    navigation.goToConversation(offre.user.id, offre.id);
                }}
                buttonStyle={ButtonStyle.PRIMARY}
                size={ButtonSize.XS}
                fullWidth={false}
                icon={ChatBubbleLeft}
            ></Button>
        {/if}
    {:else}
        <Button
            onClick={(event) => {
                event.stopPropagation();
                navigation.goToLogin();
            }}
            buttonStyle={ButtonStyle.PRIMARY}
            size={ButtonSize.XS}
            fullWidth={false}
            icon={Key}
        >
            Se connecter
        </Button>
    {/if}
</div>

<ConfirmModal
    bind:isOpen={showDeleteConfirm}
    title="Confirmer la suppression"
    message="Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible."
    onConfirm={handleDelete}
    isConfirming={deleteLoading}
/>
