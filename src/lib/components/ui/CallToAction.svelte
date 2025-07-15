<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import { navigation } from '$lib/services/navigation.service';
	import { Plus, HandRaised } from 'svelte-heros-v2';
	import type { Component } from 'svelte';	
	import { ButtonSize, ButtonStyle } from '$lib/constants/ui';
</script>

<div class="text-center mt-20">
	<div class="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl p-12 border border-emerald-200 dark:border-emerald-700/50 backdrop-blur-sm">
		<HandRaised class="w-24 h-24 mx-auto text-primary-500 mb-6" />
		<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vous aussi, participez à l'entraide !</h3>
		<p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
			Votre contribution peut faire la différence dans la vie de vos voisins. 
			Proposez un service ou demandez de l'aide en quelques clics.
		</p>
		<Button onClick={navigation.goToNewOffer} buttonStyle={ButtonStyle.PRIMARY} size={ButtonSize.XL} icon={Plus as Component}>	
			Ajouter votre offre
		</Button>
	</div>
</div> 