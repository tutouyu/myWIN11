<template>
  <div class="recyclemenu">
    <div
      v-for="(item, index) in state.rightmenu"
      :key="index"
      class="menuitem"
      @click="rightclick(index)"
    >
      <span>&nbsp;{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "rightmenu",
  props: {
    positionx: String,
    positiony: String,
  },
  setup(props, { emit }) {
    let state = reactive({
      store: useStore(),
      rightmenu: [
        {
          name: "恢复",
        },
        {
          name: "(没用选项)",
        },
        {
          name: "(没用选项)",
        },
        {
          name: "(没用选项)",
        },
        {
          name: "(没用选项)",
        },
      ],
    });
    onMounted(() => {
      let rm: HTMLElement = document.querySelector(
        ".recyclemenu"
      ) as HTMLElement;
      rm.style.left = (props.positionx + "px") as string;
      rm.style.top = (props.positiony + "px") as string;
    });
    const rightclick = (index: Number) => {
      if (index == 0) {
        emit("recover");
      } 
    };
    return {
      state,
      rightclick,
    };
  },
});
</script>

<style lang="scss">
.recyclemenu {
  position: absolute;
  background-color: rgba(228, 220, 220, 0.8);
  width: 150px;
  border-radius: 10px;
  .menuitem {
    margin: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    height: 25px;
    font-size: 16px;
    img {
      width: 20px;
      height: 20px;
    }
    &:hover {
      background-color: rgba(163, 159, 159, 0.6);
    }
  }
}
</style>