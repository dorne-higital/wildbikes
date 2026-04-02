<template>
	<div 
		v-editable="blok"
		:class="componentName"
		class="stat"
	>
		<h3 
			class="value"
		>
			{{ blok.value }}
		</h3>

		<p
			class="label eyebrow"
		>
			{{ blok.label }}
		</p>
	</div>
</template>

<script setup lang="ts">
	const props = withDefaults(
		defineProps<{ blok: any; componentName?: string }>(),
		{ componentName: 'ride-stat' }
	)
</script>

<style lang="scss" scoped>
    @use "./RideStat.scss" as *;
    @include ride-stat;
</style>