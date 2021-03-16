<template>
  <div class="container">
    <div>
      <logo />
      <div class="links">
        <Button type="primary" @click="dianji">
          点击{{getData}}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import ABC from '~/server/request/example'
// import axios from 'axios'
export default {
    components: {
        Logo
    },
    // data() {
    // console.log(this)
    //   return { a: 1 }
    // },
    created() {
        // console.log(this.$store.state.modules.navbar.list,'数据')
    },
    asyncData(context) {
        return { project: 'nuxt' }
    },
    fetch(context) {},
    computed: {
        getData() {
            return this.$store.state.modules.navbar.list
        }
    },
    methods: {
        dianji() {
            // ABC()

            // this.$nuxt.$loading.start()
            this.$axios
                .$get(
                    '/api/media-storage/mini/mediafile/querypagemediastorage?offSite=0&pageSize=10'
                )
                .then(res => {
                    console.log(res, 'hahahah')
                })
                .catch(err => {
                    console.log(err.response.data.message, 'err')
                })
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}
.links {
    padding-top: 15px;
}
</style>
