<template>
  <nav class="navbar navbar-light bg-light">
    <slot></slot>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  bottom: 0;
  z-index: 100;
}
</style>
