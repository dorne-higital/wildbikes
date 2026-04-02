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
                
                <h4
                    v-if="blok.subheading"
                    class="subheading"
                >
                    {{ blok.subheading }}
                </h4>
            </div>

            <div class="content-container">
                <StoryblokComponent
                    v-for="currentBlok in blok.stat"
                    :key="currentBlok._uid"
                    :blok="currentBlok"
                    class="blok-item"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">    
    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'stat-grid' }
    )
</script>

<style lang="scss" scoped>
    @use "./StatGrid.scss" as *;
    @include stat-grid;
</style>