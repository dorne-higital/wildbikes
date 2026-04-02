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
                <Fa
                    v-if="blok.icon?.icon"
                    :icon="[blok.icon.type, blok.icon.icon.replace('fa-', '')]"
                    class="icon"
                />

                <h5
                    v-if="blok.title"
                    class="title"
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