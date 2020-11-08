<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'default';
      return `${layout}-layout`;
    },
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
