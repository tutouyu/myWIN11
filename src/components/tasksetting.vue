<template>
  <div class="tasksetting">
    <div class="icons">
      <div
        class="icon"
        v-for="(item, index) in state.icons"
        :key="index"
        @click="clickimg(index)"
      >
        <div :class="{ img: !item.ifclick, imgclick: item.ifclick }">
          <img :src="item.img" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="adjust">
      <div class="slidebar">
        <img src="../assets/controlsIcons/brightness.png" alt="" />
        <input
          class="sliders"
          type="range"
          min="0"
          max="100"
          defaultValue="100"
          v-model="state.Lightness"
        />
      </div>
      <div class="slidebar">
        <img src="../assets/controlsIcons/audio.png" alt="" />
        <input
          class="sliders"
          type="range"
          min="0"
          max="100"
          defaultValue="100"
          v-model="state.volumeSize2"
        />
      </div>
      <div class="power">
        <img src="../assets/controlsIcons/battery.png" alt="" />
        <span>100%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, { emit }) {
    let state = reactive({
      store: useStore(),
      Lightness: 100,
      volumeSize2: 100,
      icons: [
        {
          name: "wife",
          img: require("../assets/controlsIcons/wifi.png"),
          ifclick: false,
        },
        {
          name: "bluetooth",
          img: require("../assets/controlsIcons/bluetooth.png"),
          ifclick: false,
        },
        {
          name: "Flight Mode",
          img: require("../assets/controlsIcons/offline-mode.png"),
          ifclick: false,
        },
        {
          name: "Battery Saver",
          img: require("../assets/controlsIcons/battery-saver.png"),
          ifclick: false,
        },
        {
          name: "security",
          img: require("../assets/controlsIcons/security.png"),
          ifclick: false,
        },
        {
          name: "night light",
          img: require("../assets/controlsIcons/night-light.png"),
          ifclick: false,
        },
      ],
    });
    watch(
      () => state.Lightness,
      (newValue, oldValue) => {
        console.log(newValue)
        state.store.commit("controlLightness", newValue);
      }
    );
    const clickimg = (index) => {
      state.icons[index].ifclick = !state.icons[index].ifclick;
    };
    return { state, clickimg };
  },
});
</script>

<style lang="scss">
.tasksetting {
  border-radius: 20px;
  width: 400px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: hsla(0, 0%, 100%, 0.8);
  .icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-radius: 20px;
    .icon {
      margin: 10px;
      width: 25%;
      .img {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        margin-bottom: 5px;
        border-radius: 10px;
        overflow: hidden;
        background-color: hsla(10%, 10%, 95%, 0.8);
        img {
          width: 25px;
          height: 25px;
        }
      }
      .imgclick {
        @extend .img;
        background-color: rgb(106, 106, 223);
      }
      .name {
        text-align: center;
      }
    }
  }
  .adjust {
    margin-top: 25px;
    .slidebar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      .sliders {
        width: 300px;
        background-color: rgb(106, 106, 223);
      }
      img {
        width: 25px;
        height: 25px;
        margin: 10px;
      }
    }
  }
  .power {
    margin-top: 15px;
    height: 60px;
    display: flex;
    align-items: center;
    border-radius: 0 0 15px 15px;
    background-color: rgb(238, 234, 234);
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-left: 35px;
      margin-right: 5px;
    }
  }
}
</style>