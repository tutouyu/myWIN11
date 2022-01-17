<template>
  <div class="desktop"><workspace /> <taskbar /></div>
</template>
<script>
import { ref, defineComponent } from "vue";
import taskbar from "../components/taskbar.vue";
import workspace from "../components/workspace.vue";
export default defineComponent({
  components: {
    taskbar,
    workspace,
  },
});
</script>

<style lang="scss">
.desktop {
  background: url("../assets/background/background.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
}
</style>