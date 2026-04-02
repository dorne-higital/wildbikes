<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass
        ]"
    >
        <div class="sw">
            <div
                v-if="blok.heading || blok.subheading" 
                class="heading-container"
            >
                <h2
                    v-if="blok.heading"
                    class="heading"
                >
                    {{ blok.heading }}
                </h2>
                
                <h4
                    v-if="blok.subheading"
                    class="subheading"
                >
                    {{ blok.subheading }}
                </h4>
            </div>

            <div    
                :class="blok.layout"
                class="content-container"
            >
                <StoryblokComponent
                    v-for="currentBlok in blok.image"
                    :key="currentBlok._uid"
                    :blok="currentBlok"
                    :image-count="ratioClass"
                    :class="{ 'border-color': blok.showBorder }"
                    class="blok-item"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'inline-gallery' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
    
    const dynamicClass = computed(() => {
        const color = props.blok?.theme.value.toLowerCase();
        return colorClassMapping[color] ?? null;
    });

    const colorClassMapping: Record<string, string> = {
        '#e27609': 'color-1',
        '#333333': 'color-2',
        '#c5c5c5': 'color-3',
        '#161616': 'color-4',
        '#000000': 'color-5',
    };


    const imageCount = computed(() => props.blok?.image?.length || 1)

    const ratioClass = computed(() => {
        if (imageCount.value === 1) return 'ratio-landscape'
        if (imageCount.value === 2) return 'ratio-portrait'
        return 'ratio-square'
    })
</script>

<style lang="scss" scoped>
    @use "./InlineGallery.scss" as *;
    @include inline-gallery;
</style>