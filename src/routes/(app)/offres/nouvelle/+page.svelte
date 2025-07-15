<script lang="ts">
	import { onMount } from 'svelte';
	import OffreForm from '$lib/components/features/offres/form/OffreForm.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { navigation } from '$lib/services/navigation.service';

	onMount(() => {
		if (!$authStore.session) {
			navigation.goToLogin('/offres/nouvelle');
		}
	});
</script>

<OffreForm mode="create" /> 