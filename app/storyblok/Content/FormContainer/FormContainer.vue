<template>
    <section
        v-editable="blok"
        :class="[componentName]"
        :data-theme="blok.darkTheme ? 'dark' : 'light'"
    >
        <div class="sw content">
            <div v-if="blok.heading" class="heading-container">
                <h2 class="heading">{{ blok.heading }}</h2>
            </div>

            <form
                v-if="!submitted"
                @submit.prevent="handleSubmit"
                class="dynamic-form"
            >
                <div class="fields-grid">
                    <div
                        v-for="field in blok.fields"
                        :key="field._uid"
                        :class="[
                            'field-wrapper',
                            field.width?.toLowerCase() === 'half'
                                ? 'half'
                                : 'full',
                        ]"
                    >
                        <label :for="field._uid">
                            {{ field.label }}
                            <span v-if="field.required" class="required"
                                >*</span
                            >
                        </label>

                        <textarea
                            v-if="field.type === 'textarea'"
                            :id="field._uid"
                            v-model="formData[field.label]"
                            :placeholder="field.placeholder"
                            :required="field.required"
                        ></textarea>

                        <input
                            v-else
                            :id="field._uid"
                            :type="field.type === 'number' ? 'tel' : field.type"
                            v-model="formData[field.label]"
                            :placeholder="field.placeholder"
                            :required="field.required"
                        />
                    </div>
                </div>

                <div class="form-actions">
                    <button
                        type="submit"
                        class="submit-btn"
                        :disabled="loading"
                    >
                        <Icon
                            v-if="loading"
                            name="uil:spinner"
                            class="btn-icon spinning"
                        />
                        {{ loading ? "Sending..." : "Send Message" }}
                    </button>
                </div>

                <Transition name="fade">
                    <div v-if="error" class="form-error">
                        <Icon
                            name="uil:exclamation-circle"
                            class="feedback-icon"
                        />
                        <span>{{ error }}</span>
                    </div>
                </Transition>
            </form>

            <Transition name="fade">
                <div v-if="submitted" class="success-box">
                    <div class="success-icon-wrap">
                        <Icon name="uil:check" class="success-icon" />
                    </div>
                    <h3 class="success-heading">Message sent!</h3>
                    <p class="success-message">
                        {{
                            blok.successMessage ||
                            "Thank you! We will be in touch."
                        }}
                    </p>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{ blok: any; componentName?: string }>(),
    { componentName: "form-container" },
);

const formData = reactive<Record<string, any>>({});
const submitted = ref(false);
const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
    loading.value = true;
    error.value = "";

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: props.blok.recipientAddress,
                data: formData,
            }),
        });

        if (response.ok) {
            submitted.value = true;
        } else {
            const json = await response.json().catch(() => ({}));
            error.value =
                json.statusMessage ||
                `Error ${response.status} — check server logs.`;
            console.error("[form] API error:", json);
        }
    } catch (err) {
        error.value = "Something went wrong. Please try again.";
        console.error("[form] Submission failed:", err);
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>
@use "./FormContainer.scss" as *;
@include form-container;
</style>
