<script lang="ts">
    import { page } from "$app/stores";
    import BackButton from "$lib/components/ui/BackButton.svelte";
    import Progress from "$lib/components/features/offres/form/Progress.svelte";
    import StepType from "$lib/components/features/offres/form/StepType.svelte";
    import StepCategory from "$lib/components/features/offres/form/StepCategory.svelte";
    import StepTitle from "$lib/components/features/offres/form/StepTitle.svelte";
    import StepDetails from "$lib/components/features/offres/form/StepDetails.svelte";
    import { createOffreFormFacade } from "$lib/services/offre-form.facade.svelte";
    import type { Offre } from "$lib/types/offres";
    import { navigation } from "$lib/services/navigation.service";
    import { PaperAirplane, ArrowDownTray } from "svelte-heros-v2";
    import { OFFRE_FORM_MODE, type OffreFormMode } from "$lib/constants";
	import { ButtonStyle } from "$lib/constants/ui";
	import Button from "$lib/components/ui/buttons/Button.svelte";
    let {
        mode = OFFRE_FORM_MODE.CREATE,
        initialData,
    }: { mode: OffreFormMode; initialData?: Offre } = $props();

    const form = createOffreFormFacade(mode, initialData);

</script>

<svelte:head>
    <title>{form.title} - Coup2Main</title>
</svelte:head>

<main
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
>
    <div class="max-w-4xl mx-auto px-4 py-8">
        {#if mode === OFFRE_FORM_MODE.EDIT}
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Modifier l'offre
                </h1>
                <BackButton
                    onclick={() => navigation.goToOffre($page.params.id)}
                />
            </div>
        {/if}

        <Progress current={form.currentStepIndex} total={form.steps.length} />

        <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
        >
            <div class="p-2">
                {#if form.currentStepIndex === 0}
                    <StepType
                        type={form.formData.type}
                        onSelectType={(type: string) => {
                            form.updateFormValue("type", type);
                            form.nextStep();
                        }}
                    />
                {:else if form.currentStepIndex === 1}
                    <StepCategory
                        category={form.formData.category}
                        onSelect={(category: string) => {
                            form.updateFormValue("category", category);
                            form.nextStep();
                        }}  
                    />
                {:else if form.currentStepIndex === 2}
                    <StepTitle
                        bind:title={form.formData.title}
                        type={form.formData.type}
                        suggestions={form.titleSuggestionsList}
                        validationError={form.validationErrors.title}
                        onUpdateTitle={(title: string) =>
                            form.updateFormValue("title", title)}
                    />
                {:else if form.currentStepIndex === 3}
                    <StepDetails
                        bind:description={form.formData.description}
                        bind:location={form.formData.location}
                        type={form.formData.type}
                        validationErrors={form.validationErrors}
                    />
                {/if}
            </div>

            <div
                class="px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-600"
            >
                <div class=" {form.currentStepIndex > 0 ? 'flex justify-between items-center' : 'flex justify-end items-center'}">
                    {#if form.currentStepIndex > 0}
                        <BackButton onclick={form.prevStep} text="Précédent" />
                    {/if}

                    {#if form.error}
                        <div class="text-red-600 text-sm font-medium">
                            {form.error}
                        </div>
                    {/if}

                    {#if !form.isLastStep}
                        <Button
                            onClick={form.nextStep}
                            disabled={!form.canProceed}
                        >
                            Suivant →
                        </Button>
                    {:else}
                        <Button
                            buttonStyle={ButtonStyle.SUBMIT}
                            onClick={form.handleSubmit}
                            disabled={form.loading || !form.canProceed}
                            icon={mode === OFFRE_FORM_MODE.CREATE
                                ? PaperAirplane
                                : ArrowDownTray}	
                        >
                            {form.submitButtonText}
                        </Button>
                    {/if}
                </div>
            </div>
        </div>

        <div class="text-center mt-6">
            <BackButton
                onclick={navigation.goToHome}
                text="Retour à l'accueil"
            />
        </div>
    </div>
</main>
