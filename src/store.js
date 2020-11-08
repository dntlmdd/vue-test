/*
 * Nuxt.js-like vuex modules
 *
 * For details, check out https://webpack.js.org/guides/dependency-management/#context-module-api
 *
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};

const filenameToStoreModuleName = (filename) => (
  filename
    .replace(/^\.\//, '')
    .replace(/\.js$/, '')
);

function importAll(r) {
  r.keys().forEach((key) => {
    modules[filenameToStoreModuleName(key)] = r(key).default;
  });
}

importAll(require.context('./store/', false, /\.js$/));

export default new Vuex.Store({
  modules,
  strict: true,
});
