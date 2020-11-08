<template>
  <div class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
