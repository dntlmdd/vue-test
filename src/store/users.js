// import axios from 'axios';

export default {
  namespaced: true,
  state: {
    totalUsers: 1,
    users: [],
  },
  actions: {
    async FETCH_USERS({ commit }, params) {
      const response = await this.$http.get('users', { params });

      commit('SET_USERS', {
        total: Number(response.headers['x-total-count']),
        data: response.data,
      });
    },
  },
  mutations: {
    SET_USERS(state, response) {
      state.totalUsers = response.total;
      state.users = response.data;
    },
  },
};
