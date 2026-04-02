<template>
	<section
		v-editable="blok"
		:class="[
			componentName,
		]"
        data-theme="dark"
		ref="navRef"
	>
		<div class="sw main-content">
			<div class="logo-container">
                <a href="/" class="nav_logo">
                    <img 
                        src="~/assets/images/main-logo.png"
                        alt="Logo for Wild bikes"
                    >
                </a>
			</div>

			<div class="hamburger" @click="toggleMenu">
				<span :class="{ open: isMenuOpen }"></span>
				<span :class="{ open: isMenuOpen }"></span>
				<span :class="{ open: isMenuOpen }"></span>
			</div>

			<ul class="nav">
				<li v-for="link in links" :key="link.id">
					<NuxtLink :to="link.slug === 'home' ? '/' : '/' + link.slug">
						{{ link.name }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>

	<div 
        v-if="isMenuOpen" 
        class="mobile-menu"
        data-theme="dark"
    >
		<div class="mobile-header">
            <a href="/" class="nav-logo">
                <img 
                    src="~/assets/images/main-logo.png"
                    alt="Logo for Wild bikes"
                >
            </a>

			<div class="close" @click="closeMenu">✕</div>
		</div>

		<ul class="mobile-links">
			<li v-for="link in links" :key="link.id">
				<NuxtLink
					:to="link.slug === 'home' ? '/' : '/' + link.slug"
					@click="closeMenu"
				>
					{{ link.name }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
    import type { ISbLink } from 'storyblok-js-client'

    const storyblokApi = useStoryblokApi()

    const { data } = await useAsyncData('sb-links', async () => {
        return await storyblokApi.get('cdn/links', {
            version: 'published'
        })
    })

    const links = computed<ISbLink[]>(() => {
        const linksObj = data.value?.data?.links ?? {}

        return Object.values(linksObj)
            .filter((link) => !link.is_folder)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    })

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'main-nav' }
    )

    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    const closeMenu = () => {
        isMenuOpen.value = false
        document.body.style.overflow = ''
    }
</script>

<style lang="scss" scoped>
    @use "./MainNav.scss" as *;
    @include main-nav;
</style>