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

            <div class="faq-search">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search FAQs..."
                />
            </div>

            <div class="faq-categories">
                <span
                    v-for="cat in categories"
                    :key="cat.name"
                    @click="activeCategory = cat.name"
                    :class="{ active: activeCategory === cat.name }"
                    class="tag label"
                >
                    {{ cat.name }} ({{ cat.count }})
                </span>
            </div>

            <div class="faq-list">
                <StoryblokComponent
                    v-for="faq in filteredFaqs"
                    :key="faq._uid"
                    :blok="faq"
                    :is-open="isOpen(faq._uid)"
                    :on-toggle="() => toggle(faq._uid)"
                    class="blok-item"
                />

                <div
                    v-if="filteredFaqs.length === 0" 
                    class="description richtext"
                    v-html="resolvedRichTextNoResults"
                />
            </div>
            
            <div
                v-if="filteredFaqs.length !== 0" 
                class="description richtext"
                v-html="resolvedRichTextDisclaimer"
            />
        </div>

    </section>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { renderRichText } from '@storyblok/vue';

    const props = withDefaults(
        defineProps<{ blok: any; componentName?: string }>(),
        { componentName: 'faq-stack' }
    )

    const searchQuery = ref('')
    const openItems = ref<string[]>([])
    const activeCategory = ref('All')

    const resolvedRichTextDisclaimer = computed(() => {
        if (!props.blok?.disclaimer) return '';
        return renderRichText(props.blok.disclaimer);
    });

    const resolvedRichTextNoResults = computed(() => {
        if (!props.blok?.noResults) return '';
        return renderRichText(props.blok.noResults);
    });

    const toggle = (uid: string) => {
        openItems.value = openItems.value[0] === uid ? [] : [uid]
    }

    const isOpen = (uid: string) => {
        return openItems.value.includes(uid)
    }

    const filteredFaqs = computed(() => {
        const faqs = props.blok.faq || []
        const query = searchQuery.value.toLowerCase()

        return faqs.filter((faq: any) => {
            const matchesSearch =
                !query ||
                faq.question?.toLowerCase().includes(query) ||
                JSON.stringify(faq.answer || '').toLowerCase().includes(query)

            const matchesCategory =
                activeCategory.value === 'All' ||
                faq.category?.includes(activeCategory.value)

            return matchesSearch && matchesCategory
        })
    })

    const categories = computed(() => {
        const faqs = props.blok.faq || []

        const map = new Map<string, number>()

        faqs.forEach((faq: any) => {
            (faq.category || []).forEach((cat: string) => {
                map.set(cat, (map.get(cat) || 0) + 1)
            })
        })

        return [
            { name: 'All', count: faqs.length },
                ...Array.from(map.entries()).map(([name, count]) => ({
                name,
                count
            }))
        ]
    })

    watch(activeCategory, () => {
        openItems.value = [] // collapse all
    })
</script>

<style lang="scss" scoped>
    @use "./FaqStack.scss" as *;
    @include faq-stack;
</style>