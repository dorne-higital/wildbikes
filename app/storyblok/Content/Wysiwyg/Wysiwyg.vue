<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
        class="sw"
    >
        <div
            v-if="blok.description"
            class="description richtext"
            v-html="resolvedRichText"
        />
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'wysiwyg' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
</script>

<style lang="scss" scoped>
    @use "./Wysiwyg.scss" as *;
    @include wysiwyg;
</style>