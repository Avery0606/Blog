import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  el:'#app',
  router,
  render: h => h(App),
})


