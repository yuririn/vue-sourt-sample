<template>
    <p>お名前: <input type="text" name="name" v-model="name"></p>
    <p>性別:
        <label><input type="radio" name="gender" value="男性" v-model="gender">男性</label>
        <label><input type="radio" name="gender" value="女性" v-model="gender">女性</label>
    </p>
    <p>お勤め先: <input type="text" name="company" v-model="company"></p>
    <p><button @click="getYourInfo">登録する</button></p>
</template>
<script>
import { ref } from "vue";
export default {
    setup(_, {emit}) {
        const name = ref(null)
        const gender = ref(null)
        const company = ref(null)
        const getYourInfo = () => {
            emit('info', {name: name.value, gender:  gender.value, company: company.value})
        }
        return {
            name,
            gender,
            company,
            getYourInfo
        }
    }
}
</script>
