<template>
    <time datetime="post.date">{{setDateString}}</time><span>{{post.cate}}</span>{{ post.title }}
</template>
<script>
import { computed } from "vue";
export default {
    props:{
        post: { type: [Array, boolean] }
    },
    setup(props) {
        const setDateString = computed(() =>{
            return props.post.date.replace(/-/g, '/')
        })
        return {
            setDateString
        }
    }
}
</script>
