<template>
  <div id="yuwindow" :class="{ bigwindow: size, smallwindow: !size }" v-if="isshow">
    <div
      class="toolbar"
      @mousedown="mousedown($event)"
      @mouseup="mouseup($event)"
    >
      <div class="leftbar">
        <div class="imgbox">
          <slot name="img"></slot>
        </div>
        <span><slot name="name"></slot></span>
      </div>
      <div class="rightbar">
        <div @click="close">-</div>
        <div @click="bigorsmall">▢</div>
        <div @click="close">×</div>
      </div>
    </div> 
     <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "window",
  data() {
    return {
      size: true,
      isshow:true,
    };
  },
  methods: {
    mousedown(event) {
      var event = event || window.event;
      var _target = document.querySelector("#yuwindow");
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
      document.onmousemove = function (ev) {
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
    },
    mouseup(e) {
      document.onmousemove = null;
    },
    bigorsmall() {
      this.size = !this.size;
    },
    close(){
      this.isshow=false;
    }
  },
};
</script>

<style lang="scss">
.bigwindow {
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
}
.smallwindow {
  @extend .bigwindow;
  transform: scale(0.6);
}
</style>