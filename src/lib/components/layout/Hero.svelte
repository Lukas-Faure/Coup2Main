<script lang="ts">
	import { authStore } from '$lib/stores/auth.store';
	import { onMount } from 'svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { RocketLaunch, Eye, DocumentPlus } from 'svelte-heros-v2';

	let heroRef: HTMLElement;

	onMount(() => {
		function handleScroll() {
			if (heroRef) {
				const scrolled = window.scrollY;
				const rate = scrolled * -0.5;
				heroRef.style.transform = `translateY(${rate}px)`;
			}
		}
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});


</script>

<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
	<div bind:this={heroRef} class="absolute inset-0 will-change-transform">
		<div class="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-purple-50/30 dark:from-primary-900/20 dark:via-transparent dark:to-purple-900/10"></div>
		<div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-primary-400/10 to-blue-400/10 dark:from-primary-300/5 dark:to-blue-300/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float" style="animation-duration: 6s;"></div>
		<div class="absolute top-3/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 dark:from-purple-300/5 dark:to-pink-300/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float" style="animation-duration: 8s; animation-delay: 1s;"></div>
		<div class="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 dark:from-emerald-300/5 dark:to-teal-300/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float" style="animation-duration: 10s; animation-delay: 2s;"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
		<div class="max-w-4xl mx-auto space-y-8">
			<div class="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
				<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
				<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Plateforme d'entraide locale</span>
			</div>

			<div class="space-y-6">
				<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
					<span class="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
						Coup2Main
					</span>
				</h1>
				<p class="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
					L'entraide de proximité qui 
					<span class="font-semibold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
						connecte les voisins
					</span>
				</p>
				<p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
					Proposez vos services, trouvez l'aide dont vous avez besoin, 
					<br class="hidden sm:block">
					et créez des liens authentiques dans votre quartier.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
				{#if !$authStore.session}
					<button
						on:click={() => navigation.goToLogin()}
						class="group relative inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
					>
						<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
						<span class="relative flex items-center">
							<RocketLaunch class="w-6 h-6 mr-2" />
							Commencer maintenant
						</span>
					</button>
					<button
						on:click={() => navigation.goToOffres()}
						class="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						<Eye class="w-6 h-6 mr-2" />
						Découvrir les offres
					</button>
				{:else}
					<button
						on:click={() => navigation.goToNewOffer()}
						class="group relative inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
					>
						<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
						<span class="relative flex items-center">
							<DocumentPlus class="w-6 h-6 mr-2" />
							Publier une offre
						</span>
					</button>
				{/if}
			</div>
			
			<slot name="stats"></slot>
		</div>
	</div>
</section> 