<template>
  <div class="todo-item">
    <div class="todo-item__completed">
      <input type="checkbox" :checked="todo.completed">
    </div>
    <div class="todo-item__title" v-text="todo.title" />
  </div>
</template>

<script>
export default {
  props: {
    todo: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  transition: background-color 0.1 ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  &__completed {
    margin-right: 20px;
  }

  &:hover {
    background-color: #f3f3f3;
  }
}
</style>
