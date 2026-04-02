<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
        <h2
            v-if="blok.title"
            class="title"
        >
            {{ blok.title }}
        </h2>

        <h2
            v-if="blok.label"
            class="label eyebrow"
        >
            {{ blok.label }}
        </h2>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'stat' }
    )
</script>

<style lang="scss" scoped>
    @use "./Stat.scss" as *;
    @include stat;
</style>