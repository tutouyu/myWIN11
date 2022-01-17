<template>
  <div class="workspace">
    <div
      v-for="(item, index) in state.deskicon"
      :key="index"
      class="deskicon"
      @click="open(index)"
    >
      <img :src="item.img" alt="" />
      <span>{{ item.name }}</span>
    </div>
    <transition name="fade">
      <edge v-if="state.ifEdge" @closeEdge="closeEd"></edge>
    </transition>
    <transition name="fade">
      <vscode v-if="state.ifVscode" @closeVscode="closeVs"></vscode>
    </transition>
    <transition name="fade">
      <computer v-if="state.ifComputer" @closeComputer="closeCom"></computer>
    </transition>
    <transition name="fade">
      <recycle v-if="state.ifRecycle" @closeRecycle="closeRec"></recycle>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import edge from "./edge.vue";
import vscode from "./vscode.vue";
import computer from "./mycomputer.vue";
import recycle from "./recylebin.vue";
export default defineComponent({
  components: {
    edge,
    vscode,
    computer,
    recycle,
  },
  setup() {
    const state = reactive({
      deskicon: [
        { name: "此电脑", img: require("../assets/icons/computer.png") },
        { name: "回收站", img: require("../assets/icons/trash-full.png") },
        { name: "浏览器", img: require("../assets/icons/edge.png") },
        { name: "文件夹", img: require("../assets/icons/explorer.png") },
        { name: "vscode", img: require("../assets/icons/vscode.png") },
        { name: "github", img: require("../assets/icons/github.png") },
      ],
      ifEdge: false,
      ifVscode: false,
      ifComputer: false,
      ifRecycle: false,
    });
    const open = (index: Number) => {
      if (index == 0) {
        state.ifComputer = true;
      } else if (index == 1) {
        state.ifRecycle = true;
      } else if (index == 2) {
        state.ifEdge = true;
      } else if (index == 3) {
        alert("3");
      } else if (index == 4) {
        state.ifVscode = true;
      } else if (index == 5) {
        window.open("https://github.com/tutouyu/myWIN11");
      }
    };
    const closeRec = () => {
      state.ifRecycle = false;
    };
    const closeEd = () => {
      state.ifEdge = false;
    };
    const closeVs = () => {
      state.ifVscode = false;
    };
    const closeCom = () => {
      state.ifComputer = false;
    };
    return {
      state,
      open,
      closeEd,
      closeVs,
      closeCom,
      closeRec,
    };
  },
});
</script>

<style lang="scss">
.workspace {
  position: relative;
  width: 100%;
  height: 94vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .deskicon {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 110px;
    height: 110px;
    padding: 20px;
    border-radius: 5px;
    img {
      width: 50x;
      height: 50px;
      padding-bottom: 10px;
    }
    &:hover {
      background-color: rgba($color: #e9e5e5, $alpha: 0.8);
    }
  }
}
</style>