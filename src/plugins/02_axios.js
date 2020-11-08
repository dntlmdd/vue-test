import axios from 'axios';
import Vue from 'vue';

export default ({ store }) => {
  const instance = axios.create();
  instance.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

  store.$http = instance;
  Vue.prototype.$http = instance;
};
