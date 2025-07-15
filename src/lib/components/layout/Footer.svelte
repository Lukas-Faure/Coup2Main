<script lang="ts">
	import { themeStore } from '$lib/stores/theme.store';
	import Logo from '../ui/logo.svelte';
	import { navigation, navigateTo } from '$lib/services/navigation.service';
</script>

<footer
	class="relative mt-auto border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
>
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
			<div class="md:col-span-2">
				<div class="flex items-center space-x-3 mb-4">
					<Logo />
				</div>
				<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
					La plateforme d'entraide locale qui connecte les voisins pour s'entraider au quotidien.
					Proposez vos services ou trouvez l'aide dont vous avez besoin.
				</p>
				<div class="flex items-center space-x-4 mt-4">
					<div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
						<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
						<span>Service en ligne</span>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Liens rapides</h3>
				<ul class="space-y-3">
					<li>
						<button
							on:click={() => navigateTo('/')}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Accueil</button
						>
					</li>
					<li>
						<button
							on:click={() => navigation.goToOffres()}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Parcourir les offres</button
						>
					</li>
					<li>
						<button
							on:click={() => navigation.goToNewOffer()}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Publier une offre</button
						>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h3>
				<ul class="space-y-3">
					<li>
						<button
							on:click={() => navigation.goToNotImplemented()}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Centre d'aide</button
						>
					</li>
					<li>
						<button
							on:click={() => navigation.goToNotImplemented()}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Signaler un problème</button
						>
					</li>
					<li>
						<button
							on:click={() => navigation.goToNotImplemented()}
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
							>Conditions d'utilisation</button
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
			<div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
				<div class="text-sm text-gray-500 dark:text-gray-400">
					<p>&copy; 2025 Coup2Main. Tous droits réservés.</p>
				</div>

				<div class="flex items-center space-x-6">
					<span class="text-xs text-gray-400 dark:text-gray-500"
						>Fait pour la communauté</span
					>
					<div class="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
						<span>Thème:</span>
						<span class="capitalize font-medium">{$themeStore}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer> 