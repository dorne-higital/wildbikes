<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
        <!-- <span class="icon">
            &#10004;
        </span> -->

        <span class="icon">
            <Icon name="uil:check-circle" size="2rem" />
        </span>

        <div class="content">
            <h5
                v-if="blok.title"
                class="title"
            >
                {{ blok.title }}
            </h5>

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
      { componentName: 'usp-tile' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
</script>

<style lang="scss" scoped>
    @use "./UspTile.scss" as *;
    @include usp-tile;
</style>