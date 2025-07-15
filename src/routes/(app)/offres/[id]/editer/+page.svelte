<script lang="ts">
	import OffreForm from '$lib/components/features/offres/form/OffreForm.svelte';
	let { data } = $props();
</script>

<OffreForm mode="edit" initialData={data.offre} /> 