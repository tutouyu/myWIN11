<template>
  <div class="iconmenu">
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
          name: "打开",
        },
        {
          name: "打印(没用)",
        },
        {
          name: "编辑(没用)",
        },
        {
          name: "删除",
        },
        {
          name: "设置(没用)",
        },
      ],
    });
    onMounted(() => {
      let rm: HTMLElement = document.querySelector(".iconmenu") as HTMLElement;
      rm.style.left = (props.positionx + "px") as string;
      rm.style.top = (props.positiony + "px") as string;
    });
    const rightclick = (index: Number) => {
      if (index == 0) {
        emit("open");
      } else if (index == 3) {
        state.store.commit("deleteicon",state.store.state.deletenum)
        emit("closeiconmenu")
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
.iconmenu {
  position: absolute;
  background-color: rgba(228, 220, 220, 0.8);
  width: 200px;
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