<template>
  <div class="header">
    <div class="container header__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #43967B;
  color: #fff;

  &__body {
    display: flex;
    align-items: center;
    height: 60px;
  }
}
</style>
