<template>
    <section 
        v-editable="blok" 
        :class="[componentName, dynamicClass]"
    >
        <div class="sw">
            <div 
                v-if="blok.heading || blok.subheading" 
                class="header-flex"
            >
                <div class="heading-container">
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
            </div>

            <div class="carousel-wrapper">
                <swiper-container
                    ref="swiperRef"
                    :slides-per-view="1"
                    :space-between="20"
                    :loop="true"
                    :navigation="{
                        nextEl: '.nav-next',
                        prevEl: '.nav-prev',
                    }"
                    :breakpoints="{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 }
                    }"
                    class="content-container"
                >
                    <swiper-slide
                        v-for="(currentBlok, index) in blok.image"
                        :key="currentBlok._uid"
                        @click="openGallery(index)"
                        class="image"
                    >
                        <StoryblokComponent
                            :blok="currentBlok"
                            :image-count="ratioClass"
                            :class="{ 'border-color': blok.showBorder }"
                            class="blok-item clickable"
                            loading="lazy"
                        />
                    </swiper-slide>
                </swiper-container>

            <div class="nav-controls">
                <span class="nav-prev icon">
                    <Icon 
                        name="uil:angle-left" 
                        size="2rem" 
                    />
                </span>
                <span class="nav-next icon">
                    <Icon 
                        name="uil:angle-right" 
                        size="2rem" 
                    />
                </span>
            </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';
    import { register } from 'swiper/element/bundle';
    register(); // Registers Swiper custom elements

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'inline-gallery' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
    
    const dynamicClass = computed(() => {
        const color = props.blok?.theme.value.toLowerCase();
        return colorClassMapping[color] ?? null;
    });

    const colorClassMapping: Record<string, string> = {
        '#e27609': 'color-1',
        '#333333': 'color-2',
        '#c5c5c5': 'color-3',
        '#161616': 'color-4',
        '#000000': 'color-5',
    };


    const imageCount = computed(() => props.blok?.image?.length || 1)

    const ratioClass = computed(() => {
        if (imageCount.value === 1) return 'ratio-landscape'
        if (imageCount.value === 2) return 'ratio-portrait'
        return 'ratio-square'
    })
</script>

<style lang="scss" scoped>
    @use "./InlineGallery.scss" as *;
    @include inline-gallery;
</style>