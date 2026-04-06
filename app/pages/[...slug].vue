<template>
	<StoryblokComponent 
		v-if="story" 
		:blok="story.content" 
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

// Build slug safely
const slug = computed(() =>
  route.params.slug && route.params.slug.length > 0
    ? (route.params.slug as string[]).join('/')
    : 'home'
)

// Fetch Storyblok content
const { story } = await useAsyncStoryblok(slug.value, {
  api: { version: 'draft' },
  bridge: {},
})

// Extract content (reactive-safe)
const content = computed(() => story.value?.content)

// --- SEO SETUP ---
useSeoMeta({
	title: () =>
		content.value?.seo_title ||
		content.value?.title ||
		'Default Site Title',

	description: () =>
		content.value?.seo_description ||
		'Default description for your site',

	ogTitle: () => content.value?.seo_title,
	ogDescription: () => content.value?.seo_description,
	ogImage: () => content.value?.seo_image?.filename,
})
</script>