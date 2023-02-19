<template>
    <label><input type="radio" v-model="setSortDate" :value="value" />{{ label }}</label>
</template>
<script>
import { computed } from "vue";
export default {
    props:{
        modelValue: { type: [String, null] },
        value: { type: [String, null] },
        label: { type: String }
    },
    emits:["update:modelValue"],
    setup(props, { emit }) {
        const setSortDate = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            },
        })
        return {
            setSortDate,
        }
    }
}
</script>
