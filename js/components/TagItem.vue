<template>
    <label :id="id"><input type="checkbox" v-model="narrowDown" :value="tag" />{{ tag }}</label>
</template>
<script>
import { computed } from "vue";
export default {
    props:{
        modelValue: { type: [Array, []] },
        tag: { type: [String, null] },
        id:  { type: [String, null] }
    },
    emits:["update:modelValue"],
    setup(props, { emit }) {
        const narrowDown = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            },
        })
        return {
            narrowDown,
        }
    }
}
</script>
