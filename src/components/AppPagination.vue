<template>
  <ul class="pagination" v-if="shouldRender">
    <li class="pagination__item pagination__item--first" v-if="prevPage" @click="handleClick(1)">1</li>
    <li class="pagination__item" v-if="prevPage">...</li>
    <li class="pagination__item pagination__item--prev" v-if="prevPage" v-text="'<'" @click="handleClick(prevPage)" />
    <li class="pagination__item pagination__item--current" v-text="value" />
    <li class="pagination__item pagination__item--next" v-if="nextPage" v-text="'>'" @click="handleClick(nextPage)" />
    <li class="pagination__item" v-if="lastPage">...</li>
    <li class="pagination__item pagination__item--last" v-if="lastPage" v-text="lastPage" @click="handleClick(lastPage)" />
  </ul>
</template>

<script>
export default {
  props: {
    total: { type: Number, required: true },
    perPage: { type: Number, required: true },
    value: { type: Number, required: true },
  },
  computed: {
    nextPage() {
      if ((this.value >= this.total) || !this.lastPage) return null;
      return this.value + 1;
    },
    prevPage() {
      if (this.value <= 1) return null;
      return this.value - 1;
    },
    lastPage() {
      const totalPages = Math.ceil(this.total / this.perPage);

      if (totalPages === 1 || this.value >= totalPages) return null;
      return totalPages;
    },
    shouldRender() {
      return this.total > this.perPage;
    },
  },
  methods: {
    handleClick(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 1px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 34px;
    padding: 8px;
    background-color: #333;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin-left: -1px;
    background-color: #fff;
    color: #43967B;
    cursor: pointer;

    &--current {
      background-color: #43967B;
      color: #fff;
      border-color: #43967B;
    }
  }
}
</style>
