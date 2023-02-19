
import {
  createApp,
  ref,
  onMounted,
} from "vue";

import InputItem from './components/InputItem.vue'

const app = createApp({
  components: {InputItem },
  setup() {
    const yourInfo = ref(null)
    const showYourInfo = (info) => {
      yourInfo.value = info
    }
    return {
      yourInfo,
      showYourInfo
    }
  }
})

app.mount("#app");
