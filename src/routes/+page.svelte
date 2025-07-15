<script lang="ts">
	import { authStore } from '$lib/stores/auth.store';
	import { OffreServiceClient } from '$lib/services/offre.service';
	import SearchFilters from '$lib/components/features/offres/SearchFilters.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import HomeStats from '$lib/components/features/dashboard/HomeStats.svelte';
	import OffresDisplay from '$lib/components/features/offres/OffresDisplay.svelte';
	import FeedbackMessage from '$lib/components/ui/FeedbackMessage.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import CallToAction from '$lib/components/ui/CallToAction.svelte';
	import HowItWorks from '$lib/components/layout/HowItWorks.svelte';
	import { offresStore } from '$lib/stores/offres.store';
	import { onMount } from 'svelte';
	import { Briefcase } from 'svelte-heros-v2';

	let { data } = $props();

	let showSuccess = $state(false);

	onMount(() => {
		authStore.setSession(data.session);
		showSuccess = OffreServiceClient.checkCreationSuccess();
			OffreServiceClient.loadInitialOffres();
	});

	function handleFiltersChange(filters: any) {
		OffreServiceClient.applyFilters(filters);
	}
</script>

<svelte:head>
	<title>Coup2Main - Entraide Locale</title>
	<meta
		name="description"
		content="Plateforme d'entraide locale pour échanger des services entre voisins"
	/>
</svelte:head>

{#if showSuccess}
	<FeedbackMessage 
		type="success" 
		message="Votre offre a bien été publiée et est maintenant visible de tous." 
		position="top-center"
		autoHide={true}
		duration={6000}
	/>
{/if}

<main class="relative">
	<Hero>
		<div slot="stats">
			<HomeStats />
		</div>
	</Hero>

	<section id="offres" class="py-20 relative">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<SectionHeader
				icon={Briefcase}
				subtitle="Découvrez les services de votre communauté"
				highlight="votre communauté"
			>
				Trouvez l'aide dont vous avez besoin ou proposez vos services à vos voisins
			</SectionHeader>

			<div class="relative z-10">
				<SearchFilters
					onFilterChange={handleFiltersChange}
					allOffers={$offresStore.allOffers}
				/>
			</div>

			<div class="container mx-auto px-4 py-16">
				<OffresDisplay />
			</div>

			{#if $authStore.session}
				<CallToAction />
			{/if}
		</div>
	</section>

	<HowItWorks />
</main>