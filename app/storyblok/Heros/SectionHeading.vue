<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
    dynamicClass,
            blok.bottom_shape,
        ]"
    >
        <component
            v-if="blok.heading"
            :is="headingTags?.heading"
            class="heading"
        >
            {{ blok.heading }}
        </component>

        <component
            v-if="blok.subheading"
            :is="headingTags?.subheading"
            class="subheading"
        >
            {{ blok.subheading }}
        </component>

        <NuxtLink
            v-if="blok.button?.cached_url"
            :to="blok.button.cached_url"
            :class="[
                blok.button_type,
            ]"
            class="button primary"
        >
            {{ blok.button_label }}
        </NuxtLink>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
      defineProps<{ blok: any; componentName?: string }>(),
      { componentName: 'section-heading' }
    )

    const resolvedRichText = computed(() => {
        if (!props.blok?.description) return '';
        return renderRichText(props.blok.description);
    });
    
    const dynamicClass = computed(() => {
        const color = props.blok?.background_colour.value.toLowerCase();
        return colorClassMapping[color] ?? null;
    });

    const colorClassMapping: Record<string, string> = {
        '#e27609': 'color-1',
        '#333333': 'color-2',
        '#c5c5c5': 'color-3',
        '#161616': 'color-4',
        '#000000': 'color-5',
    };

    const headingMap: Record<string, { heading: string; subheading: string }> = {
        hero: {
            heading: 'h1',
            subheading: 'h2'
        },
        primary: {
            heading: 'h1',
            subheading: 'h3'
        },
        secondary: {
            heading: 'h2',
            subheading: 'h4'
        }
    };

    const headingTags = computed(() => {
        return headingMap[props.blok.heading_type] ?? headingMap.primary
    })
</script>

<style lang="scss" scoped>
    .section-heading {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem 4rem;
        width: 100%;

        &.angular {
            clip-path: polygon(0 0, 100% 0%, 100% 85%, 50% 100%, 0 85%);
        }

        &.slash {
            clip-path: polygon(100% 0, 100% 90%, 0 100%, 0% 0);
        }

        &.rounded {
            border-radius: 0 0 2rem 2rem;
        }

        &.color-1 {
            background-color: var(--color-1);
            color: var(--text-primary);
        }

        &.color-2 {
            background-color: var(--color-2);
            color: var(--text-primary);
        }

        &.color-3 {
            background-color: var(--color-light);
            color: var(--text-dark);
        }

        &.color-4 {
            background-color: var(--background-primary);
            color: var(--text-primary);
        }

        &.color-5 {
            background-color: var(--background-secondary);
            color: var(--text-primary);
        }
    }
</style>