<template>
  <div :class="{bigedge:state.status,smalledge:!state.status}">
    <div class="tagbar">
      <div class="lefttag">
        <div class="imgbox">
          <img src="../assets/icons/edge.png" alt="" />
        </div>
        <div class="tag">
          New Tab<span style="float: right; font-weight: bold">×</span>
        </div>
      </div>
      <div class="righttag">
        <div @click="close">-</div>
        <div @click="bigorsmall">▢</div>
        <div @click="close">×</div>
      </div>
    </div>
    <div class="addressbar">
      <div class="back" @click="back">
        <img src="../assets/ui/left.png" alt="" />
      </div>
      <div class="push" @click="push">
        <img src="../assets/ui/right.png" alt="" />
      </div>
      <div class="refresh" @click="refresh">
        <img src="../assets/ui/refresh.png" alt="" />
      </div>
      <div class="address">
        <input type="text" v-model="state.addressValue" />
      </div>
      <div class="to" @click="toNewAddress">
        <img src="../assets/ui/arrowRight.png" alt="">
      </div>
      <div class="dian">
        <img src="../assets/ui/threedian.png" alt="" />
      </div>
    </div>
    <div class="collectbar">
      <div
        v-for="(item, index) in state.address"
        :key="index"
        class="web"
        @click="totagweb(index)"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="content">
      <iframe
        :src="state.thisAddress"
        frameborder="0"
        width="100%"
        height="100%"
        id="myweb"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive} from "vue";
export default defineComponent({
  setup(props, { emit }) {
    let state = reactive({
      address: [
        { name: "哔哩哔哩", icon: "https://www.bilibili.com/favicon.ico" },
        { name: "力扣", icon: "https://leetcode-cn.com/favicon.ico" },
        { name: "掘金", icon: "https://juejin.cn/favicon.ico" },
        { name: "菜鸟教程", icon: "https://www.runoob.com/favicon.ico" },
        { name: "秃头鱼的博客", icon: "http://tutouyu.com/bitbug_favicon.ico" },
      ],
      lastAddress: [] as any[],
      nextAddress: [] as any[],
      thisAddress: "http://tutouyu.com/",
      addressValue: "http://tutouyu.com",
      status: true,
    });
    const close = () => {
      emit("closeEdge");
    };
    const totagweb = (index: number) => {
      state.lastAddress.push(state.thisAddress);
      if (index == 0) {
        state.thisAddress = "https://www.bilibili.com/";
        state.addressValue = "https://www.bilibili.com/";
      } else if (index == 1) {
        state.thisAddress = "https://leetcode-cn.com/";
        state.addressValue = "https://leetcode-cn.com/";
      } else if (index == 2) {
        state.thisAddress = "https://juejin.cn/";
        state.addressValue = "https://juejin.cn/";
      } else if (index == 3) {
        state.thisAddress = "https://www.runoob.com/";
        state.addressValue = "https://www.runoob.com/";
      } else if (index == 4) {
        state.thisAddress = "http://tutouyu.com/";
        state.addressValue = "http://tutouyu.com/";
      }
    };
    const back = () => {
      if (state.lastAddress.length >= 1) {
        state.nextAddress.push(state.thisAddress);
        state.thisAddress = state.lastAddress[state.lastAddress.length - 1];
        state.addressValue = state.lastAddress[state.lastAddress.length - 1];
        state.lastAddress.pop();
      }
    };
    const push = () => {
      if (state.nextAddress.length >= 1) {
        state.lastAddress.push(state.thisAddress);
        state.thisAddress = state.nextAddress[state.nextAddress.length - 1];
        state.addressValue = state.nextAddress[state.nextAddress.length - 1];
        state.nextAddress.pop();
      }
    };
    const refresh = () => {
      let item = state.thisAddress;
      state.thisAddress = "";
      setTimeout(() => {
        state.thisAddress = item;
      }, 1);
    };
    const toNewAddress = () => {
      state.lastAddress.push(state.thisAddress);
      alert(state.addressValue);
      state.thisAddress = state.addressValue;
    };
    const bigorsmall = () => {
      state.status = !state.status;
    };
    return {
      state,
      close,
      totagweb,
      back,
      push,
      refresh,
      toNewAddress,
      bigorsmall,
    };
  },
});
</script>

<style lang="scss">
.bigedge {
  transition: all 0.1s ease;
  position: absolute;
  top: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  .tagbar {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(236, 229, 229);
    .lefttag {
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
      .tag {
        width: 220px;
        height: 32px;
        font-size: 15px;
        line-height: 20px;
        padding: 8px;
        background-color: white;
        border-radius: 3px;
      }
    }
    .righttag {
      display: flex;
      align-items: center;
      div {
        font-weight: bold;
        line-height: 32px;
        width: 32px;
        height: 32px;
        text-align: center;
        &:hover {
          background-color: rgb(223, 219, 219);
        }
      }
    }
  }
  .addressbar {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .back {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: rgba($color: #ece8e8, $alpha: 1);
      }
    }
    .push {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: rgba($color: #ece8e8, $alpha: 1);
      }
    }
    .refresh {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: rgba($color: #ece8e8, $alpha: 1);
      }
    }
    .address {
      display: flex;
      align-items: center;
      height: 100%;
      flex:1;
      input {
        border-radius: 10px;
        width: 100%;
        height: 30px;
        padding: 0 10px;
      }
    }
    .to {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: rgba($color: #ece8e8, $alpha: 1);
      }
    }
    .dian {
      width: 20px;
      height: 100%;
      margin: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 20px;
      }
    }
  }
  .collectbar {
    width: 100%;
    height: 26px;
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    .web {
      border-radius: 5px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      img {
        width: 26px;
        height: 26px;
        padding: 5px;
      }
      &:hover {
        background-color: rgba($color: #ece8e8, $alpha: 1);
      }
    }
  }
  .content {
    background-color: black;
    width: 100%;
    height: calc(94vh - 26px - 50px - 32px);
  }
}
.smalledge{
   @extend .bigedge;
   transform:  scale(0.6);
   overflow: hidden;
}
</style>