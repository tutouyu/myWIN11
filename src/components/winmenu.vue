<template>
  <div class="winmenu">
    <div class="fixed">
      <div class="title">已固定</div>
      <div class="icons">
        <div class="icon" v-for="(item, index) in state.fixed" :key="index">
          <img :src="item.img" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="title">桌面应用</div>
      <div class="icons">
        <div
          class="icon"
          v-for="(item, index) in state.store.state.deskicon"
          :key="index"
          @click="winopen(index)"
        >
          <img :src="item.img" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="switch">
      <div class="head">
        <img src="../assets/background/head.jpeg" alt="" />
        <span>tutouyu</span>
      </div>
      <div class="button">
        <img src="../assets/menuIcons/power.png" @click="close" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup(props, { emit }) {
    let router = useRouter();
    let state = reactive({
      store: useStore(),
      fixed: [
        { name: "Mail", img: require("../assets/appIcons/mail.png") },
        { name: "OneNote", img: require("../assets/appIcons/onenote.png") },
        {
          name: "PowerPoint",
          img: require("../assets/appIcons/powerpoint.png"),
        },
        { name: "Word", img: require("../assets/appIcons/word.png") },
        { name: "Twitter", img: require("../assets/appIcons/twitter.png") },
        { name: "Store", img: require("../assets/appIcons/store.png") },
        { name: "Pdf", img: require("../assets/appIcons/pdf.png") },
        {
          name: "MarkDown",
          img: require("../assets/appIcons/markdown.png"),
        },
      ],
    });
    let close=()=>{
        router.push({ path:'/open'})
    }
    let winopen=(index:Number)=>{
      emit("taskopen",index)
    }
    return {
      winopen,
      router,
      state,
      close,
    };
  },
});
</script>

<style lang="scss">
.winmenu {
  width: 600px;
  height: 600px;
  border-radius: 20px;
  background-color: hsla(0, 0%, 100%, 0.8);
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  font-weight: bold;
  .fixed {
    height: 45%;
    .title {
      padding: 20px;
      padding-left: 40px;
    }
    .icons {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      .icon {
        padding: 5px;
        margin-bottom: 20px;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          margin-bottom: 5px;
        }
        span {
          font-size: 10px;
        }
        &:hover {
          background-color: hsla(0, 8%, 77%, 0.8);
        }
      }
    }
  }
  .recommend {
    @extend .fixed;
  }
  .switch {
    border-radius: 0 0 10px 10px;
    background-color: hsla(0, 15%, 88%, 0.8);
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head {
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        vertical-align: middle;
        margin: 8px;
      }
      margin-left: 30px;
    }
    .button {
      color: black;
      padding: 10px;
      margin-right: 30px;
      img {
        width: 20px;
        height: 20px;
        border-radius: 10px;
      }
      &:hover {
        background-color: hsla(0, 8%, 77%, 0.8);
      }
    }
  }
}
</style>