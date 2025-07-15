<script lang="ts">
	import { sizeClasses3, colorClasses, ButtonSize } from '$lib/constants/ui';
	let {
		size = ButtonSize.MD,
		color = 'primary',
	}: {
		size: keyof typeof sizeClasses3;
		color: keyof typeof colorClasses;
	} = $props();
	
	
</script>

<div class="flex items-center justify-center">
	<div class="relative">
		<div class="{sizeClasses3[size]} border-4 {colorClasses[color]} rounded-full animate-spin"></div>
		
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
		</div>
		
		<div class="absolute inset-0 {sizeClasses3[size]} rounded-full bg-gradient-to-tr from-transparent via-primary-500/10 to-transparent animate-pulse"></div>
	</div>
</div>