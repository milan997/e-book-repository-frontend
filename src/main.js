import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './config/router';
import Session from './service/session';

Vue.config.productionTip = false;
Vue.prototype.$session = Session;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
