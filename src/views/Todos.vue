<template>
  <div class="todos">
    <AppHeader>
      <button class="todos__back" @click="back" v-text="'< Users'"></button>
    </AppHeader>
    <div class="container todos__list">
      <AppLoader v-if="isLoading" />
      <div v-else>
        <TodoItem :todo="todo" :key="todo.id" v-for="todo in todos"/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';
import AppHeader from '@/components/AppHeader';
import AppLoader from '@/components/AppLoader';

import { mapActions, mapState } from 'vuex';

export default {
  components: {
    TodoItem,
    AppHeader,
    AppLoader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState('todos', ['todos']),
    userId() {
      return this.$route.params.userId;
    },
  },
  watch: {
    userId: {
      immediate: true,
      async handler(val) {
        try {
          this.isLoading = true;
          await this.FETCH_TODOS(val);
        } catch (e) {
          // fuck it
        } finally {
          this.isLoading = false;
        }
      },
    },
  },
  methods: {
    ...mapActions('todos', ['FETCH_TODOS']),
    back() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todos {
  &__back {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    font-weight: 700;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }

  &__list {
    margin-top: 20px;
  }
}
</style>
