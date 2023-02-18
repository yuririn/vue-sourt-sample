import {
  createApp,
  ref,
} from 'vue';

import PostItem from './components/PostItem.vue';

const app = createApp({
  components:{ PostItem },
  setup() {

    const posts = ref(
      [
        { date : '2023-1-12', title:'カワサンの滝にネッシーが現れた！', cate: 'スクープ'},
        { date : '2023-2-14', title:'バレンタインデーに幻のチョコはいかが？', cate: 'グルメ'},
        { date : '2023-2-18', title:'ゴンザレス一家に7つ子誕生！ママ奮闘記', cate: '地域'}
      ]
    );
    return {
      posts
    }
  }
})
app.mount("#app");
