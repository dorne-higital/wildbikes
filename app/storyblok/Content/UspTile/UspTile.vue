<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
        <Fa
            v-if="blok.icon?.icon"
            :icon="['fas', blok.icon.icon.replace('fa-', '')]"
            class="icon"
        />

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