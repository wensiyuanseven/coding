import Vue from 'vue'
import App from './App.vue'
import { Button, Select } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
