<template>
  <div :class="{ vscode: state.status, vscode1: !state.status }" id="vscode">
    <div
      class="toolbar"
      @mousedown.self="mousedown($event)"
      @mouseup.self="mouseup($event)"
    >
      <div class="leftbar">
        <div class="imgbox">
          <img src="../assets/icons/vscode.png" alt="" />
        </div>
        <span>Visual Studio Code</span>
      </div>
      <div class="rightbar">
        <div @click="close">-</div>
        <div @click="bigorsmall">▢</div>
        <div @click="close">×</div>
      </div>
    </div>
    <iframe
      src="https://github1s.com/tutouyu/myWIN11"
      class="vscodeFrame"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import TaskBar from "../../../../win11/win11-vue/src/components/TaskBar.vue";
export default defineComponent({
  components: { TaskBar },
  setup(props, { emit }) {
    let state = reactive({
      status: true,
    });
    const close = () => {
      emit("closeVscode");
    };
    const bigorsmall = () => {
      state.status = !state.status;
    };
    const mousedown = (event: any) => {
      var event = event || window.event;
      var _target: HTMLElement = document.querySelector(
        "#vscode"
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
      close,
      bigorsmall,
      state,
    };
  },
});
</script>

<style lang="scss">
.vscode {
  transition: all 0.1s ease;
  position: absolute;
  top: 0;
  background-color: rgb(43, 42, 42);
  width: 100%;
  height: 100%;
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
        color: white;
      }
    }
    .rightbar {
      display: flex;
      align-items: center;
      color: white;
      div {
        font-weight: bold;
        line-height: 32px;
        width: 32px;
        height: 32px;
        text-align: center;
        &:hover {
          background-color: rgb(54, 54, 54);
        }
      }
    }
  }
  .vscodeFrame {
    width: 100%;
    height: calc(94vh - 32px);
  }
}
.vscode1 {
  @extend .vscode;
  transform: scale(0.6);
}
</style>