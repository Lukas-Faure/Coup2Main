<script lang="ts">
	let {
		stepNumber,
		title,
		description,
		gradientClasses,
		lineGradientClasses,
		rotationClass,
		showSeparator
	} = $props<{
		stepNumber: number;
		title: string;
		description: string;
		gradientClasses: string;
		lineGradientClasses?: string;
		rotationClass: string;
		showSeparator: boolean;
	}>();
</script>

<div class="group text-center relative">
	<div class="relative mb-8">
		<div
			class="w-24 h-24 bg-gradient-to-br {gradientClasses} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110 {rotationClass}"
		>
			<span class="text-4xl text-white font-bold">{stepNumber}</span>
		</div>
		{#if showSeparator}
			<div
				class="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r {lineGradientClasses}"
			></div>
		{/if}
	</div>
	<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
	<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
		{description}
	</p>
</div> 