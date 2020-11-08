export default {
  namespaced: true,
  state: {
    todos: [],
  },
  actions: {
    async FETCH_TODOS({ commit }, userId) {
      const { data } = await this.$http.get('todos', { params: { userId } });

      commit('SET_TODOS', data);
    },
  },
  mutations: {
    SET_TODOS(state, users) {
      state.todos = users;
    },
  },
};
