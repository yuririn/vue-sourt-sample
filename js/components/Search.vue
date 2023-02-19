<template>
    <div class="sort">
        <h3>日付で並べ替え</h3>
        <ul class="select-tags">
            <SortDate v-model:sort="sortDate"></SortDate>
        </ul>
        <h3>タグで絞り込み</h3>
        <ul class="select-tags">
            <li v-for="tag in tags" :key="tag"><TagItem :tag="tag" v-model:tagvalue="selectedTags"></TagItem></li>
        </ul>
        <div class="sortBtns">
            <button @click="sort">実行</button>
            <button @click="clear">クリア</button>
      </div>
    </div>
</template>
<script>
import TagItem from './TagItem.vue'
import SortDate from './SortDate.vue'
import { ref } from "vue";
export default {
    components: {TagItem,SortDate},
    props: {
        tags: Array,
        tagvalue: Array,
        sort: String,
    },
    setup(props, { emit }) {
        const selectedTags = ref([])
        const sortDate = ref(null)
        const sort = () =>{
            emit('search', {'tags': selectedTags.value, 'date': sortDate.value})
        }
        const clear = () =>{
            selectedTags.value = []
            sortDate.value = null
            emit('clear')
        }
        return {
            sort,
            clear,
            selectedTags,
            sortDate
        }
    }
}
</script>
