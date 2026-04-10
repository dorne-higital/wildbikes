<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
            <a
                v-if="blok.title || blok.description" 
                class="tile-container"
                :href="blok?.file?.url" 
                target="_blank"
            >
                <span 
                    v-if="blok.title || blok.description"
                    class="icon"
                >
                    <Icon name="uil:upload" size="2rem" />
                </span>

                <h5
                    v-if="blok.title"
                    class="title label eyebrow"
                >
                    {{ blok.title }}
                </h5>
                
                <p
                    v-if="blok.description"
                    class="descripton"
                >
                    {{ blok.description }}
                </p>
            </a>
    </section>
</template>

<script setup lang="ts">

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'icon-tile' }
    )
</script>

<style lang="scss" scoped>
    @use "./IconTile.scss" as *;
    @include icon-tile;
</style>