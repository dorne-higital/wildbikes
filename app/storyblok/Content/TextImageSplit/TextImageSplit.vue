<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass,
            `${blok.height || 'main'}`,
            `${blok.alignment || 'right'}`,
        ]"
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
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'text-image-split' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
    
    const dynamicClass = computed(() => {
        const color = props.blok?.background_colour.value.toLowerCase();
        return colorClassMapping[color] ?? null;
    });

    const colorClassMapping: Record<string, string> = {
        '#e27609': 'color-1',
        '#333333': 'color-2',
        '#c5c5c5': 'color-3',
        '#161616': 'color-4',
        '#000000': 'color-5',
    };
</script>

<style lang="scss" scoped>
    @use "./TextImageSplit.scss" as *;
    @include text-image-split;
</style>