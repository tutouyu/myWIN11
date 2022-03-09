<template>
  <div class="nothing">
      <h3>已完成功能(未完成的一律用这个界面代替)</h3>
    <div class="point">
      <div class="title">文件资源管理器（我的电脑）</div>
      递归查看 地址栏和侧边导航栏和内容显示耦合 历史后退和前进 放大缩小 可拖动
    </div>
    <div class="point">
      <div class="title">回收站</div>
      文件恢复 放大缩小 可拖动
    </div>
    <div class="point">
      <div class="title">浏览器</div>
      网页浏览 地址输入和点击收藏栏跳转 历史后退和前进 刷新页面 放大缩小 可拖动
    </div>
    <div class="point">
      <div class="title">vscode</div>
      vscode全部功能 放大缩小 可拖动
    </div>
    <div class="point">
      <div class="title">github</div>
      跳转到我github 
    </div>
    <div class="point">
      <div class="title">右键菜单</div>
      新建文件 删除文件 刷新 排序 打开图标
    </div>
    <div class="point">
      <div class="title">开始菜单</div>
      打开桌面图标 关机 调节亮度
    </div>
    <div class="point"><div class="title"></div></div>
    <div class="point"><div class="title"></div></div>
    <div class="point"><div class="title"></div></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style lang="scss">
.nothing {
 h3{
     margin-top:15px;
     text-align: center;
 }
  width: 600px;
  border-radius: 20px;
  background-color: rgba(230, 225, 225, 0.8);
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .point {
      .title{
          font-size: 15px;
          font-weight: bold;
          padding: 10px 0;
      }
    margin: 15px  15px 0 15px;
    font-size: 15px;
  }
}
</style>