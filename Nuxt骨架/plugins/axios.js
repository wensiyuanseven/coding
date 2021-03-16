// import Vue from 'vue'
export default function({ $axios, redirect }) {
  // 给所有的服务设置头部信息
  $axios.setHeader('Authorization', '123')
  // $axios.setToken('123aaa')
  // Object.defineProperty(Vue.prototype, '$request', {
  //   values: $axios,
  //   writable: false
  // })
  $axios.onRequest(config => {
    console.log(config, 'congig')
  })
  $axios.onResponse(response => {
    console.log(response, 'response')
  })
  $axios.onError(error => {
    console.log(error.response, 'error')
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
// Object.defineProperty(Vue.prototype, '$service', {
//   value: $axios,
//   writable: false
// })
