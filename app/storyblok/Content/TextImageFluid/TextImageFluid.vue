<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div 
            :class="[
                `${blok.alignment || 'right'}`,
            ]"
            class="sw content"
        >
            <div class="content-container">
                <h1 
                    v-if="blok.heading"
                    class="heading"
                >
                    {{ blok.heading }}
                </h1>

                <h3
                    v-if="blok.subheading"
                    class="subheading"
                >
                    {{ blok.subheading }}
                </h3>

                <div
                    v-if="blok.description"
                    class="description richtext"
                    v-html="resolvedRichText"
                />
            </div>

            <div 
                class="image-container"
                :class="blok.shape" 
            >
                <img
                    class="image"
                    :src="blok.image.filename"
                    :alt="blok.image.alt || blok.heading"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'text-image-fluid' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
</script>

<style lang="scss" scoped>
    @use "./TextImageFluid.scss" as *;
    @include text-image-fluid;
</style>