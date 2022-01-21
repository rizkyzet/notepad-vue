<template>
  <nav class="navbar navbar-light bg-light">
 
      <slot></slot>

  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.slide-fade-enter-active {
  transition: all 5s ease-out;
}

.slide-fade-leave-active {
  transition: all 5s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

</style>
