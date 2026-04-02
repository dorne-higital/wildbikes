<template>
    <section
        v-editable="blok"
        :class="[componentName]"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div class="sw content">
            <div 
                v-if="blok.heading || blok.subheading" 
                class="heading-container"
            >
                <h2 
                    v-if="blok.heading"
                >
                    {{ blok.heading }}
                </h2>

                <h4 
                    v-if="blok.subheading"
                >
                    {{ blok.subheading }}
                </h4>
            </div>

            <div class="tabs" ref="tabsRef">
                <div class="tabs-track">
                    <div
                        class="tabs-slider"
                        :style="sliderStyle"
                    />

                    <button
                        v-for="(ride, i) in blok.rides"
                        :key="ride._uid"
                        ref="tabRefs"
                        @click="setActive(i)"
                        class="tab-button"
                        :class="{ active: activeIndex === i }"
                    >
                        {{ ride.heading }}
                    </button>
                </div>
            </div>

            <div class="tab-content">
                <StoryblokComponent
                    v-if="blok.rides?.[activeIndex]"
                    :blok="blok.rides[activeIndex]"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted, nextTick, watch } from 'vue'

    const props = withDefaults(
        defineProps<{ blok: any; componentName?: string }>(),
        { componentName: 'ride-tabs' }
    )

    const activeIndex = ref(0)

    const tabRefs = ref<HTMLElement[]>([])
    const sliderStyle = ref({})

    const setActive = (i: number) => {
        activeIndex.value = i
    }

    const updateSlider = () => {
        const el = tabRefs.value[activeIndex.value]
        if (!el) return

        sliderStyle.value = {
            width: `${el.offsetWidth}px`,
            transform: `translateX(${el.offsetLeft}px)`
        }
    }

    onMounted(() => {
        nextTick(updateSlider)
    })

    watch(activeIndex, async () => {
        await nextTick()
        updateSlider()
    })
</script>

<style lang="scss" scoped>
    @use "./RideTabs.scss" as *;
    @include ride-tabs;
</style>