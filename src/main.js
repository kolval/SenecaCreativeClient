import Vue from 'vue'
import App from './App.vue'
import router from './router/Router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/css/main.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import store from '../src/store'
import 'downloadjs'
Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')