<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import type { Snippet } from 'svelte';
	import { ButtonStyle } from '$lib/constants/ui';
	import { ExclamationTriangle } from 'svelte-heros-v2';
	let {
		isOpen = $bindable(),
		title,
		message,
		isConfirming = false,
		children,
		onConfirm,
		onCancel,
		confirmButtonText = 'Confirmer',
	}: {
		isOpen: boolean;
		title: string;
		message: string;
		isConfirming?: boolean;
		children?: Snippet;
		onConfirm?: () => void;
		onCancel?: () => void;
		confirmButtonText?: string;
	} = $props();

</script>

{#if isOpen}
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
		transition:fly={{ duration: 200, y: 10 }}
	>
		<div class="bg-white dark:bg-gray-800 rounded-2xl p-8 m-4 max-w-md w-full shadow-2xl">
			<div class="text-center">
				{#if children}
					<div class="mb-4">
						{@render children()}
					</div>
				{:else}
					<div class="text-5xl mb-4 text-warning-500">
						<ExclamationTriangle class="w-16 h-16 mx-auto" />
					</div>
				{/if}

				<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
				<p class="text-gray-600 dark:text-gray-400 mb-8 text-sm">
					{message}
				</p>
				<div class="flex gap-3">
					{#if onCancel}
					<Button
						buttonStyle={ButtonStyle.SECONDARY}
						onClick={onCancel}
						disabled={isConfirming}
						fullWidth
					>
						Annuler
					</Button>
					{/if}
					<Button
						buttonStyle={ButtonStyle.RED_DANGER}	
						onClick={onConfirm}
						disabled={isConfirming}
						fullWidth
					>
						{confirmButtonText}
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if} 