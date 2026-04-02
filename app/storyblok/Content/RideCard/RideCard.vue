<template>
	<div 
		v-editable="blok" 
		:class="componentName"
	>
		<div 
			v-if="blok.image?.filename" 
			class="image"
		>
			<img 
				:src="blok.image.filename" 
				:alt="blok.heading" 
			/>
		</div>

		<div class="content">
			<h3
				v-if="blok?.heading?.length"
				class="heading"
			>
				{{ blok.heading }}
			</h3>

			<h5 
				v-if="blok.subheading" 
				class="subheading"
			>
				{{ blok.subheading }}
			</h5>

			<!-- Stats -->
			<div 
				v-if="blok.stats?.length"
				class="stats"
			>
				<StoryblokComponent
					v-for="stat in blok.stats"
					:key="stat._uid"
					:blok="stat"
				/>
			</div>
			
			<span 
				v-if="blok.difficulty?.length" 
				:class="blok.difficulty"
				class="label eyebrow tag"
			>
				{{ blok.difficulty }}
			</span>

			<!-- Description -->
			<div
				class="description richtext"
				:class="{ truncated: isLong && !showModal }"
				v-html="resolvedRichText"
			/>

			<a
				v-if="isLong"
				class="read-more link"
				@click="showModal = true"
			>
				Read more
			</a>
		</div>

		<div 
			v-if="showModal" 
			class="modal-overlay" 
			@click.self="showModal = false"
		>
			<div class="modal">
				<span 
					class="close" 
					@click="showModal = false"
				>
					✕
				</span>

				<h4
					v-if="blok?.heading?.length"
					class="modal-heading"
				>
					{{ blok.heading }}
				</h4>

				<div
					class="modal-content richtext"
					v-html="resolvedRichText"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { renderRichText } from '@storyblok/vue'
	import { ref, computed } from 'vue'

	const props = withDefaults(
		defineProps<{ blok: any; componentName?: string }>(),
		{ componentName: 'ride-card' }
	)

	const showModal = ref(false)

	const resolvedRichText = computed(() => {
		if (!props.blok?.description) return ''
		return renderRichText(props.blok.description as any)
	})

	const plainText = computed(() => {
		if (!props.blok?.description) return ''
		return renderRichText(props.blok.description)
			.replace(/<[^>]+>/g, '') // strip HTML
	})

	const wordCount = computed(() => {
		return plainText.value.trim().split(/\s+/).length
	})

	const isLong = computed(() => {
		return resolvedRichText.value.length > 500 // rough check
	})
	
	watch(showModal, (val) => {
		document.body.style.overflow = val ? 'hidden' : ''
	})
</script>

<style lang="scss" scoped>
    @use "./RideCard.scss" as *;
    @include ride-card;
</style>