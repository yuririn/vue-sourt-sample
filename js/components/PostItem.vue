<template>
   <label><input type="checkbox" v-model="votePost" :value="post.title"><time datetime="post.date">{{setDateString}}</time><span>{{post.cate}}</span>{{ post.title }}</label>
</template>
<script>
import { computed } from "vue";
export default {
    props:{
        modelValue: { type: [Array, []] },
        post: { type: [Array, []] }
    },
    emits:["update:modelValue"],
    setup(props, { emit }) {
        const setDateString = computed(() =>{
            return props.post.date.replace(/-/g, '/')
        })
        const votePost = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            },
        })
        return {
            setDateString,
            votePost,
        }
    }
}
</script>
