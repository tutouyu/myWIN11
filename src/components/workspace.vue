<template>
  <div
    class="workspace"
    @contextmenu.prevent.self="rightClick($event)"
    @click.self="mouseclick"
  >
    <div
      class="iconcontainer"
      v-if="state.ifrefresh"
      @click.self="mouseclick"
      @contextmenu.prevent.self="rightClick($event)"
    >
      <div
        v-for="(item, index) in state.store.state.deskicon"
        :key="index"
        class="deskicon"
        @click="open(item.type)"
        @contextmenu.prevent.stop="iconRight($event, item.type, index)"
      >
        <img :src="item.img" alt="" />
        <span>{{ item.name }}</span>
      </div>
      <transition name="fade">
        <edge v-if="state.ifshow[2]" @closeEdge="closeEd"></edge>
      </transition>
      <transition name="fade">
        <vscode v-if="state.ifshow[4]" @closeVscode="closeVs"></vscode>
      </transition>
      <transition name="fade">
        <computer v-if="state.ifshow[0]" @closeComputer="closeCom"></computer>
      </transition>
      <transition name="fade">
        <recycle v-if="state.ifshow[1]" @closeRecycle="closeRec"></recycle>
      </transition>
      <transition name="fade">
        <rightmenu
          v-if="state.ifshow[6]"
          :positionx="state.mouseposition.x"
          :positiony="state.mouseposition.y"
          @refresh="refresh"
          @closeRig="closeRig"
        ></rightmenu>
      </transition>
      <transition name="fade">
        <iconmenu
          v-if="state.ifshow[7]"
          :positionx="state.mouseposition.x"
          :positiony="state.mouseposition.y"
          @open="open(state.store.state.opennum)"
          @closeiconmenu="closeiconmenu"
        ></iconmenu>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import edge from "./edge.vue";
import vscode from "./vscode.vue";
import computer from "./mycomputer.vue";
import recycle from "./recylebin.vue";
import rightmenu from "./rightmenu.vue";
import iconmenu from "./iconmenu.vue";
export default defineComponent({
  components: {
    rightmenu,
    edge,
    vscode,
    computer,
    recycle,
    iconmenu,
  },
  setup(props, { emit }) {
    const state = reactive({
      store: useStore(),
      // ifEdge: false,
      // ifVscode: false,
      // ifComputer: false,
      // ifRecycle: false,
      // ifRight: false,
      //修改为数组更方便 电脑0 回收站1 浏览器2 空文件夹3 vscode4 github 5 右键菜单6 图标右键7
      ifshow: [false, false, false, false, false, false, false, false],
      ifrefresh: true,
      mouseposition: {
        x: "0",
        y: "0",
      },
    });
    //桌面图标点击
    const open = (type: Number) => {
      state.ifshow[6] = false;
      state.ifshow[7] = false;
      if (type == 0) {
        state.ifshow[0] = true;
      } else if (type == 1) {
        state.ifshow[1] = true;
      } else if (type == 2) {
        state.ifshow[2] = true;
      } else if (type == 3) {
        state.ifshow[3] = true;
      } else if (type == 4) {
        state.ifshow[4] = true;
      } else if (type == 5) {
        window.open("https://github.com/tutouyu/myWIN11");
      }
    };
    //关回收站
    const closeRec = () => {
      state.ifshow[1] = false;
    };
    //关浏览器
    const closeEd = () => {
      state.ifshow[2] = false;
    };
    //关vscode
    const closeVs = () => {
      state.ifshow[4] = false;
    };
    //关我的电脑
    const closeCom = () => {
      state.ifshow[0] = false;
    };
    const rightClick = (e: any) => {
      state.ifshow[6] = false;
      state.ifshow[7] = false;
      state.mouseposition.x = String(e.x);
      state.mouseposition.y = String(e.y);
      setTimeout(() => {
        state.ifshow[6] = true;
      }, 1);
    };
    //刷新
    const refresh = () => {
      state.ifrefresh = false;
      setTimeout(() => {
        state.ifrefresh = true;
      }, 1);
      state.ifshow[6] = false;
    };
    //鼠标点击时候右键菜单隐藏
    const mouseclick = () => {
      state.ifshow[6] = false;
      state.ifshow[7] = false;
    };
    const closeRig = () => {
      state.ifshow[6] = false;
    };
    const closeiconmenu = () => {
      state.ifshow[7] = false;
    };
    const iconRight = (e: any, type: Number, index: Number) => {
      state.store.commit("openicon", type);
      state.store.commit("deleteiconnum", index);
      state.ifshow[7] = false;
      state.ifshow[6] = false;
      state.mouseposition.x = String(e.x);
      state.mouseposition.y = String(e.y);
      setTimeout(() => {
        state.ifshow[7] = true;
      }, 1);
    };
    return {
      state,
      closeRig,
      closeiconmenu,
      iconRight,
      open,
      refresh,
      closeEd,
      closeVs,
      closeCom,
      closeRec,
      rightClick,
      mouseclick,
    };
  },
});
</script>

<style lang="scss">
.workspace {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 94vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .iconcontainer {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 94vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
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
}
</style>