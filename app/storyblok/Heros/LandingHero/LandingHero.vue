<template>
    <section v-editable="blok" :class="[componentName]">
        <div class="media-wrapper">
            <video
                v-if="blok.backgroundVideo?.filename"
                class="media-video"
                autoplay
                muted
                loop
                playsinline
            >
                <source :src="blok.backgroundVideo.filename" type="video/mp4" />
            </video>

            <template v-else>
                <img
                    v-for="(image, i) in images"
                    :key="image.id || i"
                    class="media-image"
                    :class="{ active: i === activeIndex }"
                    :src="image.filename"
                    :alt="image.alt || blok.heading"
                />
            </template>
        </div>

        <div data-theme="dark" class="sw hero-content">
            <div class="hero-inner">
                <h1 v-if="blok.heading" class="hero">
                    {{ blok.heading }}
                </h1>

                <h3 v-if="blok.subheading" class="subheading">
                    {{ blok.subheading }}
                </h3>

                <p v-if="blok.label" class="label">
                    {{ blok.label }}
                </p>

                <div
                    v-if="blok.primaryCta || blok.secondaryCta"
                    class="cta-row"
                >
                    <NuxtLink
                        v-if="blok.primaryCta?.cached_url"
                        class="button primary"
                        :to="blok.primaryCta.cached_url"
                    >
                        {{
                            blok.primaryLinkText
                                ? blok.primaryLinkText
                                : blok.primaryCta.cached_url
                        }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="blok.secondaryCta?.cached_url"
                        class="button outline"
                        :to="blok.secondaryCta.cached_url"
                    >
                        {{
                            blok.secondaryLinkText
                                ? blok.secondaryLinkText
                                : blok.secondaryCta.cached_url
                        }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{ blok: any; componentName?: string }>(),
    { componentName: "landing-hero" },
);

const images = computed(() => {
    const field = props.blok.backgroundImage;
    if (Array.isArray(field) && field.length) return field;
    if (field?.filename) return [field];
    return [];
});

const activeIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    if (images.value.length > 1) {
        timer = setInterval(() => {
            activeIndex.value = (activeIndex.value + 1) % images.value.length;
        }, 4500);
    }
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
@use "./LandingHero.scss" as *;
@include landing-hero;
</style>
