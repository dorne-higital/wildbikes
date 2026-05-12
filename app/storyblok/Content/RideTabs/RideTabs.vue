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
                <h2 v-if="blok.heading">{{ blok.heading }}</h2>
                <h4 v-if="blok.subheading">{{ blok.subheading }}</h4>
            </div>

            <!-- Mobile carousel -->
            <div class="tabs-carousel">
                <button class="carousel-arrow" @click="prevTab" aria-label="Previous">
                    <Icon name="uil:angle-left" />
                </button>

                <div class="carousel-center">
                    <span class="carousel-label">{{ blok.rides?.[activeIndex]?.heading }}</span>
                    <div class="carousel-dots">
                        <span
                            v-for="(_, i) in blok.rides"
                            :key="i"
                            class="dot"
                            :class="{ active: i === activeIndex }"
                            @click="setActive(i)"
                        />
                    </div>
                </div>

                <button class="carousel-arrow" @click="nextTab" aria-label="Next">
                    <Icon name="uil:angle-right" />
                </button>
            </div>

            <!-- Desktop tabs -->
            <div class="tabs" ref="tabsRef">
                <div class="tabs-track">
                    <div class="tabs-slider" :style="sliderStyle" />

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

    const total = () => props.blok.rides?.length ?? 0

    const setActive = (i: number) => {
        activeIndex.value = i
    }

    const prevTab = () => {
        activeIndex.value = (activeIndex.value - 1 + total()) % total()
    }

    const nextTab = () => {
        activeIndex.value = (activeIndex.value + 1) % total()
    }

    const updateSlider = () => {
        const el = tabRefs.value[activeIndex.value]
        if (!el) return
        sliderStyle.value = {
            width: `${el.offsetWidth}px`,
            transform: `translateX(${el.offsetLeft}px)`
        }
    }

    onMounted(() => { nextTick(updateSlider) })
    watch(activeIndex, async () => { await nextTick(); updateSlider() })
</script>

<style lang="scss" scoped>
    @use "./RideTabs.scss" as *;
    @include ride-tabs;
</style>
