<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            `${blok.height || 'main'}`,
            `${blok.align || 'right'}`,
        ]"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div class="image-wrapper">
            <img
                v-if="blok.backgroundImage?.filename"
                :src="blok.backgroundImage.filename"
                :alt="blok.backgroundImage.alt || blok.heading"
            />
        </div>

        <div 
            :class="[
                `${blok.align || 'right'}`,
            ]"
            class="sw main-content"
        >
            <div 
                :class="[
                    `${blok.align || 'right'}`,
                ]"
                class="content-card" 
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

                <div
                    v-if="blok.description"
                    class="description richtext"
                    v-html="resolvedRichText"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'text-image-overlay' }
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
</script>

<style lang="scss" scoped>
    @use "./TextImageOverlay.scss" as *;
    @include text-image-overlay;
</style>