import Vue from 'vue';
import loadPlugins from '@/services/loadPlugins';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

loadPlugins({ app, store, router });

app.$mount('#app');
