<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style lang="scss">
@import "./assets/css/base.css";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
