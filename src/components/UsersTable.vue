<template>
  <table class="users-table">
    <thead>
      <tr class="users-table__header">
        <th class="users-table__cell users-table__cell--header">Name</th>
        <th class="users-table__cell users-table__cell--header">Email</th>
        <th class="users-table__cell users-table__cell--header">Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr class="users-table__row" v-for="user in users" :key="user.id" @click="clickHandler(user.id)">
        <td  class="users-table__cell" v-text="user.name" />
        <td  class="users-table__cell" v-text="user.email" />
        <td  class="users-table__cell" v-text="user.name" />
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
  },
  methods: {
    clickHandler(id) {
      this.$router.push({ path: `/users/${id}/` });
    },
  },
};
</script>

<style lang="scss" scoped>
.users-table {
  --row-background: transparent;
  --row-color: #000;

  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-bottom: 2px solid #43967B;

  &__header {
    position: sticky;
    top: 0;
    background-color: #43967B;
    color: #fff;
  }

  &__row {
    cursor: pointer;
    background-color: var(--row-background);
    color: var(--row-color);
    transition: all 0.1s ease-in-out;

    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }

    &:hover {
      --row-background: #f3f3f3;
      --row-color: #43967B;
    }
  }

  &__cell {
    padding: 15px;
    border-bottom: inherit;

    &--header {
      font-weight: 700;

      &:first-child {
        border-top-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
      }
    }
  }
}
</style>
