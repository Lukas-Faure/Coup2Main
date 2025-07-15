<script lang="ts">
	import { navigation } from '$lib/services/navigation.service';
	import { User } from 'svelte-heros-v2';
	function handleSignIn() {
		navigation.goToLogin();
	}
</script>

<button
	onclick={handleSignIn}
	class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
	aria-label="Se connecter"
	title="Se connecter"
>
	<User class="h-4 w-4" aria-hidden="true" />	
</button> 