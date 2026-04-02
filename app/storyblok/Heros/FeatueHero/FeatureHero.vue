<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            blok.shape
        ]"
        :style="backgroundStyle"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div 
            class="content-container"
        >
            <p
                v-if="blok.label"
                class="label eyebrow"
            >
                {{ blok.label }}
            </p>

            <h1 
                v-if="blok.heading"
                class="heading"
            >
                {{ blok.heading }}
            </h1>

            <h4
                v-if="blok.subheading"
                class="subheading"
            >
                {{ blok.subheading }}
            </h4>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'feature-hero' }
    )

    const backgroundStyle = computed(() => {
        if (!props.blok?.image?.filename) return {}

        return {
            backgroundImage: `url(${props.blok.image.filename})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
    })
</script>

<style lang="scss" scoped>
    @use "./FeatureHero.scss" as *;
    @include feature-hero;
</style>