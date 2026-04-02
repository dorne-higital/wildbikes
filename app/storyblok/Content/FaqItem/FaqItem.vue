<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
        <div 
            class="question" 
            @click="onToggle"
            :class="{ isopen : isOpen }"
        >
            {{ blok.question }}

            <span class="icon">
                {{ !isOpen ? '+' : '-' }}
            </span>
        </div>

        <div 
            v-show="isOpen"
            class="answer"
        >
            <div
                class="description richtext"
                v-html="resolvedRichText"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
        defineProps<{
            blok: any
            componentName?: string
            isOpen: boolean
            onToggle: () => void
        }>(),
        { componentName: 'faq-item' }
    )

    defineEmits(['toggle'])

    const resolvedRichText = computed(() => {
        if (!props.blok?.answer) return '';
        return renderRichText(props.blok.answer);
    });
</script>

<style lang="scss" scoped>
    @use "./FaqItem.scss" as *;
    @include faq-item;
</style>