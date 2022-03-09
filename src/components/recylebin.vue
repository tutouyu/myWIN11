<template>
  <div
    :class="{ bigrecycle: state.status, smallrecycle: !state.status }"
    @click="mouseclick"
    id="recycle"
  >
    <div
      class="toolbar"
      @mousedown.self="mousedown($event)"
      @mouseup.self="mouseup($event)"
    >
      <div class="leftbar">
        <div class="imgbox">
          <img src="../assets/icons/computer.png" alt="" />
        </div>
        <span>回收站</span>
      </div>
      <div class="rightbar">
        <div @click="close">-</div>
        <div @click="bigorsmall">▢</div>
        <div @click="close">×</div>
      </div>
    </div>
    <div class="dealbar">
      <div class="first">
        <div class="imgbox">
          <img src="../assets/menuIcons/new.png" alt="" />
        </div>
        <span>New</span>
      </div>
      <div class="second">
        <img src="../assets/menuIcons/binMenuBar.png" alt="" />
      </div>
      <div class="third">
        <div class="sort">
          <div class="imgbox">
            <img src="../assets/menuIcons/sort.png" alt="" />
          </div>
          <span>排序</span>
        </div>
        <div class="look">
          <div class="imgbox">
            <img src="../assets/menuIcons/check.png" alt="" />
          </div>
          <span>查看</span>
        </div>
      </div>
      <div class="fourth">
        <img src="../assets/ui/threedian.png" alt="" />
      </div>
    </div>
    <div class="navbar">
      <div class="tofrom">
        <img src="../assets/fileexplorer/左.png" alt="" /><img
          src="../assets/fileexplorer/右.png"
          alt=""
        /><img src="../assets/fileexplorer/上.png" alt="" />
      </div>
      <div class="address">
        <img src="../assets/fileexplorer/computer.png" alt="" />
        <div class="path">回收站</div>
        <img src="../assets/fileexplorer/右.png" alt="" class="to" />
      </div>
      <div class="search">
        <img src="../assets/fileexplorer/搜索.png" alt="" /> <span>搜索</span>
      </div>
    </div>
    <div class="content">
      <div class="filecontent">
        <div
          v-for="(item, index) in state.store.state.binfiles"
          :key="index"
          class="contentfile"
          @contextmenu.prevent.stop="recycleRight($event, index)"
        >
          <img :src="item.img" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <recyclemenu
          v-if="state.rightshow"
          :positionx="state.mouseposition.x"
          :positiony="state.mouseposition.y"
          @recover="recover"
        ></recyclemenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import sidefile from "./common/sidefile.vue";
import recyclemenu from "./recyclemenu.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    sidefile,
    recyclemenu,
  },
  setup(props, { emit }) {
    let state = reactive({
      store: useStore(),
      status: true,
      mouseposition: {
        x: "0",
        y: "0",
      },
      rightshow: false,
      //files中type对应的图片数组
      fileimg: [
        require("../assets/icons/computer.png"),
        require("../assets/fileexplorer/五角星.png"),
        require("../assets/fileexplorer/网络.png"),
        require("../assets/fileexplorer/disk.png"),
        require("../assets/fileexplorer/radio.png"),
        require("../assets/fileexplorer/music.png"),
        require("../assets/fileexplorer/file.png"),
        require("../assets/fileexplorer/picture.png"),
        require("../assets/fileexplorer/desktop.png"),
        require("../assets/fileexplorer/download.png"),
        require("../assets/fileexplorer/folder.png"),
      ],
    });
    const close = () => {
      emit("closeRecycle");
    };
    const recycleRight = (e: any, index: Number) => {
      let rb: HTMLElement = document.querySelector(".recycle") as HTMLElement;
      let left = rb.offsetLeft;
      let top = rb.offsetTop;
      state.rightshow = false;
      state.mouseposition.x = String(e.x - left);
      state.mouseposition.y = String(e.y - top);
      state.store.commit("recovernum", index);
      setTimeout(() => {
        state.rightshow = true;
      }, 1);
    };
    const mouseclick = () => {
      state.rightshow = false;
    };
    const recover = () => {
      state.rightshow = false;
      state.store.commit("recovericon", state.store.state.recovernum);
    };
    const bigorsmall = () => {
      state.status=!state.status
    };
    const mousedown = (event: any) => {
      var event = event || window.event;
      var _target: HTMLElement = document.querySelector(
        "#recycle"
      ) as HTMLElement;
      console.log(_target);
      var startx = event.clientX;
      var starty = event.clientY;
      var sb_bkx = startx - _target.offsetLeft;
      var sb_bky = starty - _target.offsetTop;
      var ww = document.documentElement.clientWidth;
      var wh = window.innerHeight;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }

      document.onmousemove = function (ev: any) {
        var event = ev || window.event;
        var scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (
          event.clientY < 0 ||
          event.clientX < 0 ||
          event.clientY > wh ||
          event.clientX > ww
        ) {
          return false;
        }
        var endx = event.clientX - sb_bkx;
        var endy = event.clientY - sb_bky;
        _target.style.left = endx + "px";
        _target.style.top = endy + "px";
      };
    };

    const mouseup = (e: any) => {
      document.onmousemove = null;
    };
    return {
      mousedown,
      mouseup,
      recover,
      close,
      bigorsmall,
      recycleRight,
      mouseclick,
      state,
    };
  },
});
</script>

<style lang="scss">
.bigrecycle {
  border: 1px solid rgb(211, 209, 209);
  width: 100%;
  height: 94vh;
  position: absolute;
  background-color: #f3f3f3;
  .toolbar {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftbar {
      display: flex;
      align-items: center;
      .imgbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 32px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      span {
        color: rgb(0, 0, 0);
      }
    }
    .rightbar {
      display: flex;
      align-items: center;
      color: rgb(0, 0, 0);
      div {
        font-weight: bold;
        line-height: 32px;
        width: 32px;
        height: 32px;
        text-align: center;
        &:hover {
          background-color: rgb(218, 216, 216);
        }
      }
    }
  }
  .dealbar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .first {
      height: 70%;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgb(175, 172, 172);
      .imgbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      span {
        color: rgb(0, 0, 0);
      }
    }
    .second {
      height: 70%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-right: 1px solid rgb(175, 172, 172);
    }
    .third {
      height: 70%;
      border-right: 1px solid rgb(175, 172, 172);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .look {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 5px;
        .imgbox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        span {
          color: rgb(0, 0, 0);
        }
      }
      .sort {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 5px;
        .imgbox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        span {
          color: rgb(0, 0, 0);
        }
      }
    }
    .fourth {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-left: 20px;
        width: 25px;
        height: 25px;
      }
    }
  }
  .navbar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .tofrom {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 12.5px;
        margin: 0 10px;
        width: 25px;
        height: 25px;
        &:hover {
          background-color: rgb(235, 226, 226);
        }
      }
    }
    .address {
      width: 60%;
      height: 70%;
      border: 1px rgb(77, 77, 77) solid;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      .to {
        position: absolute;
        right: 0;
        &:hover {
          background-color: rgb(226, 221, 221);
        }
      }
      img {
        margin: 0 5px;
        width: 25px;
        height: 25px;
      }
      .path {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .curpath {
          line-height: 30px;
          height: 30px;
          &:hover {
            background-color: rgb(226, 221, 221);
          }
        }
      }
    }
    .search {
      flex: 1;
      margin: 0 8px;
      height: 70%;
      border: 1px rgb(77, 77, 77) solid;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img {
        width: 25px;
        height: 25px;
        margin: 0 6px;
      }
    }
  }
  .content {
    display: flex;
    .sidebar {
      border-right: 2px solid rgb(194, 189, 189);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      width: 18%;
      height: calc(600px - 32px - 40px - 50px - 5px);
      overflow: scroll;
      .sidefiles {
        width: 100%;
      }
    }
    .filecontent {
      flex: 1;
      display: flex;
      padding: 10px;
      .contentfile {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          margin: 5px;
          width: 40px;
          height: 40px;
        }
        &:hover {
          background-color: rgb(199, 218, 231);
        }
      }
    }
  }
}
.smallrecycle{
    @extend .bigrecycle;
  transform: scale(0.6);
}
</style>