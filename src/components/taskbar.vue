<template>
  <div class="taskbar">
    <div class="leftbar"></div>
    <div class="centerbar">
      <div
        v-for="(item, index) in state.baricon"
        :key="index"
        class="baricon"
        @click="show(index)"
      >
        <img :src="item.img" alt="" />
      </div>
    </div>
    <div class="rightbar">
      <div class="otherbar" @click="settingclick">
        <div
          v-for="(item, index) in state.attricon"
          :key="index"
          class="attricon"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
      <div class="timebar">
        <span>{{
          state.year +
          "&nbsp;" +
          "/" +
          "&nbsp;" +
          state.month +
          "&nbsp;" +
          "/" +
          "&nbsp;" +
          state.day
        }}</span>
        <span>{{
          state.hh + ":" + state.mm + " " + state.weeks[state.week]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, { emit }) {
    let store = useStore();
    let state = reactive({
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
      hh: new Date().getHours(),
      mm: new Date().getMinutes(),
      ss: new Date().getSeconds(),
      week: new Date().getDay(),
      weeks: [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      baricon: [
        { name: "start", img: require("../assets/icons/start.png") },
        { name: "search", img: require("../assets/icons/search-light.png") },
        { name: "setting", img: require("../assets/icons/settings.png") },
      ],
      attricon: [
        { name: "wife", img: require("../assets/ui/offline-mode.png") },
        { name: "power", img: require("../assets/ui/battery.png") },
        { name: "audio", img: require("../assets/ui/audio.png") },
      ],
    });
    let show = (index) => {
      if (index == 0) {
        store.commit("workandtask", 0);
      } else if (index == 1) {
        store.commit("workandtask", 1);
      } else if (index == 2) {
        store.commit("workandtask", 1);
      }
    };
    const settingclick = () => {
      store.commit("workandtask", 2);
    };
    onMounted(() => {
      setInterval(() => {
      state.year=new Date().getFullYear()
      state.month= new Date().getMonth()+1
      state.day= new Date().getDate()
      state.hh= new Date().getHours()
      state.mm= new Date().getMinutes()
      state.ss= new Date().getSeconds()
      state.week= new Date().getDay()
      }, 1000);
    });
    return {
      settingclick,
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
  .leftbar {
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