<template>
    <section
        v-editable="blok"
        :class="[
            componentName
        ]"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div class="sw content">
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
                
                <h3
                    v-if="blok.subheading"
                    class="subheading"
                >
                    {{ blok.subheading }}
                </h3>
            </div>

            <div class="content-container">
                <StoryblokComponent
                    v-for="currentBlok in blok.tile"
                    :key="currentBlok._uid"
                    :blok="currentBlok"
                    class="blok-item"
                />
            </div>

            <div
                v-if="blok.description"
                class="description richtext"
                v-html="resolvedRichText"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';
    
    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'usp-tile-grid' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
</script>

<style lang="scss" scoped>
    @use "./UspTileGrid.scss" as *;
    @include usp-tile-grid;
</style>