<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            imageCount
        ]"
    >
        <img
            :src="blok.image.filename"
            :alt="blok.image.alt || 'Image displaying content'"
            class="img"
        />
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            blok: any;
            componentName?: string;
            imageCount?: string | number
        }>(),
        { componentName: 'image' }
    )
</script>

<style lang="scss" scoped>
    @use "./Image.scss" as *;
    @include image;
</style>