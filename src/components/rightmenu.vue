<template>
  <div class="rightmenu">
    <div
      v-for="(item, index) in state.rightmenu"
      :key="index"
      class="menuitem"
      @click="rightclick(index)"
    >
      <img :src="item.img" alt="" />
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
          name: "查看(没用)",
          img: require("../assets/menuIcons/view.png"),
        },
        {
          name: "排序",
          img: require("../assets/menuIcons/sort.png"),
        },
        {
          name: "刷新",
          img: require("../assets/menuIcons/refresh.png"),
        },
        {
          name: "新建",
          img: require("../assets/menuIcons/new.png"),
        },
        {
          name: "设置(没用)",
          img: require("../assets/menuIcons/setting.png"),
        },
        {
          name: "个性化(没用)",
          img: require("../assets/menuIcons/personalize.png"),
        },
      ],
    });
    onMounted(() => {
      let rm: HTMLElement = document.querySelector(".rightmenu") as HTMLElement;
      rm.style.left = (props.positionx + "px") as string;
      rm.style.top = (props.positiony + "px") as string;
      console.log(rm.style.left);
    });
    const rightclick = (index: Number) => {
      if (index == 1) {
        state.store.commit("iconsort");
        emit("closeRig");
      } else if (index == 2) {
        emit("refresh");
      } else if (index == 3) {
        state.store.commit("newfile");
        emit("closeRig");
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
.rightmenu {
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