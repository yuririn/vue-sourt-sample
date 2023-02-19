<template>
    <label><input type="checkbox" :value="tag" v-model="narrowDown" name="tag"/>{{ tag }}</label>
</template>
<script>
import { computed } from "vue";
export default {
    props: {
        tag: String,
        tagvalue: Array
    },
    emits:["update:tagvalue"],
    setup(props, { emit }) {
        const narrowDown = computed({
            get: () => {
                return props.tagvalue
            },
            set: (value) => {
                emit('update:tagvalue', value)
            },
        })
        return {
            narrowDown
        }
    }
}
</script>
