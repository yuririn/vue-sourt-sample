<template>
    <label v-for="item in sortValue"><input type="radio" :value="item.value" name="date" v-model="setSortDate">{{ item.label }}</label>
</template>
<script>
import { computed, ref } from "vue";
export default {
    props:{
        sort:  String,
        value: String,
        label: String
    },
    emits:["update:sort"],
    setup(props, { emit }) {
        const setSortDate = computed({
            get: () => props.sort,
            set: (value) => {
                emit('update:sort', value)
            },
        })
        const sortValue = ref([
        {
            label:"新しい順",
            value: 'desc',
        },
        {
            label:"古い順",
            value: 'asc',
        }
        ]);
        return {
            setSortDate,
            sortValue
        }
    }
}
</script>
