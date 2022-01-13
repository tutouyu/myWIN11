<template>
  <div class="openBg" @click="showEnter">
    <transition name="fade">
      <div class="login" v-show="enter">
        <div class="user">
          <div class="head"></div>
          <div class="name">tutouyu(秃头鱼)(●ˇ∀ˇ●)</div>
          <div class="but" @click="toDesktop">Sign in</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref,defineComponent } from "vue";
import {useRouter} from 'vue-router'
export default defineComponent({
  setup() {
    let enter = ref(false);
    let router = useRouter();
    const showEnter = () => {
      enter.value = !enter.value;
    };
    const toDesktop = () =>{
      router.push({ path:'/desktop'})
    };
    return {
      enter,
      showEnter,
      toDesktop
    };
  }
});
</script>

<style lang="scss">
.openBg {
  width: 100%;
  height: 100vh;
  background: url("../assets/background/open.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.6s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(1, 1, 1, 0.5);
    .user {
      width: 300px;
      height: 350px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .head {
        width: 200px;
        height: 200px;
        border-radius: 100px;
        background: url("../assets/background/head.jpeg");
        background-size: 100% 100%;
        background-position: center center;
      }
      .name {
        text-align: center;
        width: 200px;
        height: 30px;
        color: white;
        font-size: 18px;
      }
      .but {
        text-align: center;
        width: 120px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background-color: rgba($color: #929090, $alpha: 0.5);
        color: white;
        font-size: 20px;
        &:hover {
          border: 1px rgb(83, 83, 83) solid;
        }
      }
    }
  }
}
</style>