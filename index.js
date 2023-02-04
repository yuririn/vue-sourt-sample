
import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3.2.4/dist/vue.esm-browser.prod.js";

const jsonUrl = 'articles.json';

const app = createApp({
  setup() {
    const articles = ref(null);
    const paged = 10
    const total = ref(null)
    const currentPage = ref(1)
    const maxPage = ref(null)
    const tags = ref(null)
    const selectedTags = ref([])
    const sortDate = ref(null)
    const message = ref(null)

    const sortArticle = async () => {
      let result;
      result = await fetch( jsonUrl );
      result = await result.json();

      if(selectedTags.value.length !== 0) {
        result = result.filter((i) => {
          const article = i.tags.map(k => {
            if(selectedTags.value.includes(k)) return true;
          })
          if(article.includes(true)) return i;
        })
      }

      if(sortDate.value !== null) {
        result = result.sort((a, b) => {
          if(sortDate.value === 'desc') {
            return (a.date < b.date ? 1 : -1);
          } else if(sortDate.value === 'asc') {
            return (a.date > b.date ? 1 : -1);
          }
        });
      }
      total.value = result.length;

      maxPage.value = Math.ceil(total.value / paged)
      articles.value  = result.slice( paged *  (currentPage.value - 1), paged * currentPage.value)
    }
    const getTags = async () => {
      let tagList;
      tagList = await fetch( jsonUrl );
      tagList = await tagList.json();
      tagList = tagList.reduce((tags, article) => {
        if (article.tags) {
          article.tags.map(item => {
            if (tags.find(i => i === item)) {
              return false;
            }
            tags = [...tags, item]
          })
        }
        return tags
      },[])

      tags.value = tagList
    }
    const sort = async () => {
      currentPage.value = 1;
      await sortArticle();
      message.value = selectedTags.value.length !== 0 ? `${selectedTags.value.join(", ")} の記事が ${total.value} 件あります。` : null;
    }
    const clear = async () => {
      currentPage.value = 1;
      selectedTags.value = []
      sortDate.value = null
      message.value = null

      await sortArticle();
    }

    const pagination = async (dir) => {
      if(dir === 'prev') {
        if (currentPage.value === 1) {
          return;
        }
        currentPage.value--;
      }
      if(dir === 'next') {
        if (currentPage.value === maxPage.value) {
          return;
        }
        currentPage.value++;
      }
      await sortArticle();
    };

    onMounted( async () => {
      await sortArticle();
      await getTags();
    })
    return {
      articles,
      tags,
      currentPage,
      total,
      maxPage,
      selectedTags,
      sortDate,
      message,
      pagination,
      sortArticle,
      sort,
      clear
    }
  }
})

app.mount("#app");
