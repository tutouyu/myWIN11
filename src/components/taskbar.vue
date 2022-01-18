<template>
  <div class="taskbar">
    <div class="leftbar"></div>
    <div class="centerbar">
      <div v-for="(item, index) in state.baricon" :key="index" class="baricon" @click="show(index)">
        <img :src="item.img" alt="" />
      </div>
    </div>
    <div class="rightbar">
      <div class="otherbar">
        <div
          v-for="(item, index) in state.attricon"
          :key="index"
          class="attricon"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
      <div class="timebar">
        <span>{{ state.time.curtime }}</span>
        <span>{{ state.time.day }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, { emit }) {
    let store=useStore()
    let state = reactive({
      baricon: [
        { name: "start", img: require("../assets/icons/start.png") },
        { name: "search", img: require("../assets/icons/search-light.png") },
        { name: "setting", img: require("../assets/icons/settings.png") },
        { name: "files", img: require("../assets/icons/explorer.png") },
      ],
      time: {
        day: "2022/1/22",
        curtime: "17:37 周三",
      },
      attricon: [
        { name: "wife", img: require("../assets/ui/offline-mode.png") },
        { name: "power", img: require("../assets/ui/battery.png") },
        { name: "audio", img: require("../assets/ui/audio.png") },
      ],
    });
    let show=(index)=>{
      if(index==0){
        store.commit("workandtask",0)
      }
    }
    return {
      show,
      state,
    };
  },
});
</script>

<style lang="scss">
.taskbar {
  width: 100%;
  height: 6vh;
  background-color: rgba($color: #dbd6d6, $alpha: 0.9);
  display: flex;
  justify-content: space-between;
  .leftbar{
      width: 210px;
  }
  .centerbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .baricon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 6vh;
      img {
        width: 40px;
        height: 4vh;
        padding: 1px 5px;
      }
      &:hover {
        background-color: rgba($color: #ece9e9, $alpha: 1);
      }
    }
  }
  .rightbar {
    display: flex;
    justify-content: center;
    align-items: center;
    .timebar {
      font-size: 14px;
      padding: 0 15px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &:hover {
        background-color: rgba($color: #ece9e9, $alpha: 1);
      }
    }
    .otherbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      &:hover {
        background-color: rgba($color: #ece9e9, $alpha: 1);
      }
      .attricon {
        padding: 5px;
        img {
          width: 25px;
          height: 3vh;
        }
      }
    }
  }
}
</style>