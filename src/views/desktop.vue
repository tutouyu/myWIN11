<template>
  <div
    class="desktop-shade"
    :style="{ '--opacity': store.state.Lightness }"
  >
    <div class="desktop"><workspace /> <taskbar /></div>
  </div>
</template>
<script>
import { ref, defineComponent } from "vue";
import taskbar from "../components/taskbar.vue";
import workspace from "../components/workspace.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    taskbar,
    workspace,
  },
  setup() {
    let store = useStore();
    return {
      store,
    };
  },
});
</script>

<style lang="scss">
.desktop {
  height: 100vh;
  background: url("../assets/background/background.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  position: relative;
}
.desktop-shade {
  --opacity: 0;
}
.desktop-shade::after {
  content: "";
  background: black;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  pointer-events: none;
  transition: 0.5s;
}

.desktop-shade::after {
  opacity: var(--opacity);
}
</style>