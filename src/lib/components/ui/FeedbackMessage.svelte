<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';
	import { positionClasses, feedbackTypeConfig } from '$lib/constants/ui';
	import {
		XMark,
		CheckCircle,
		ExclamationTriangle,
		InformationCircle,
		XCircle
	} from 'svelte-heros-v2';

	let {
		type = 'info',
		title = '',
		message = '',
		autoHide = true,
		duration = 5000,
		dismissible = true,
		position = 'top-center',
		showIcon = true,
		actions,
		onHide = () => {}
	}: {
		type?: keyof typeof feedbackTypeConfig;
		title?: string;
		message?: string;
		autoHide?: boolean;
		duration?: number;
		dismissible?: boolean;
		position?: keyof typeof positionClasses;
		showIcon?: boolean;
		actions?: Snippet;
		onHide?: () => void;
	} = $props();

	let visible = $state(true);
	let timeoutId: ReturnType<typeof setTimeout>;

	const iconMap = {
		CheckCircle,
		ExclamationTriangle,
		InformationCircle,
		XCircle
	};

	const config = $derived(feedbackTypeConfig[type]);
	const DisplayIcon = $derived(iconMap[config.icon]);
	const displayTitle = $derived(title || config.defaultTitle);

	$effect(() => {
		if (autoHide && visible && position !== 'inline') {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {	
				hide();
			}, duration);
		}
	});

	function hide() {
		visible = false;
		onHide();
	}

	onDestroy(() => {
		if (timeoutId) clearTimeout(timeoutId);
	});
</script>

{#if visible}
	<div
		class="{positionClasses[position]} max-w-2xl mx-auto"
		role="alert"
	>
		<div class="{config.bgClass} {config.borderClass} backdrop-blur-sm border rounded-2xl p-4 w-full">
			<div class="flex items-center justify-between">
				<div class="flex items-start space-x-3 flex-1">
					{#if showIcon}
						<div class="flex-shrink-0 mt-0.5">
							{#if DisplayIcon}
								{@const IconComponent = DisplayIcon}
								<IconComponent class="w-6 h-6" />
							{/if}
						</div>
					{/if}

					<div class="flex-1 min-w-0">
						<h3 class="text-sm font-semibold {config.titleClass} mb-0.5">
							{displayTitle}
						</h3>

						{#if message}
							<p class="text-sm {config.textClass} leading-relaxed">
								{message}
							</p>
						{/if}
					</div>
				</div>

				<div class="flex-shrink-0 ml-4 flex items-center space-x-2">
					{#if actions}
						{@render actions()}
					{/if}

					{#if dismissible}
						<button
							type="button"
							onclick={hide}
							class="p-1.5 rounded-lg {config.textClass} hover:{config.titleClass} hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
							aria-label="Fermer"
						>
							<XMark class="w-4 h-4" />
						</button>
					{/if}
				</div>
			</div>

			{#if autoHide && visible && position !== 'inline'}
				<div class="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
					<div
						class="h-full bg-gradient-to-r from-{type}-400 to-{type}-600 opacity-50"
						style="animation: shrink {duration}ms linear forwards;"
					></div>
				</div>
			{/if}
		</div>
	</div>
{/if}