<template>
	<footer
		v-editable="blok"
		:class="[componentName]"
		data-theme="dark"
	>
		<div class="sw main-content">
			<div class="affiliations">
                <a 
                    href="https://www.britishcycling.org.uk/"
                    target="_blank"
                >
                    <img 
                        src="~/assets/images/british-cycling.png"
                        alt="British Cycling"
                    >
                </a>

                <a 
                    href="https://www.cyclinguk.org/"
                    target="_blank"
                >
                    <img 
                        src="~/assets/images/cyclinguk.jpg"
                        alt="Cycling UK"
                    >
                </a>
			</div>

			<ul class="footer-links">
				<li v-for="link in links" :key="link.id">
					<NuxtLink :to="link.slug === 'home' ? '/' : '/' + link.slug">
						{{ link.name }}
					</NuxtLink>
				</li>
			</ul>

            <div class="footer-bottom">
                <p>© {{ currentYear }} Wild Bikes. All rights reserved.</p>
            </div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const links = await useSiteLinks()

const props = withDefaults(
	defineProps<{ blok: any; componentName?: string }>(),
	{ componentName: 'main-footer' }
)

const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use "./MainFooter.scss" as *;
@include main-footer;
</style>