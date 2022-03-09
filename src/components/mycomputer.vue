<template>
  <div
    :class="{ bigmycomputer: state.size, smallmycomputer: !state.size }"
    id="mycomputer"
  >
    <div
      class="toolbar"
      @mousedown="mousedown($event)"
      @mouseup="mouseup($event)"
    >
      <div class="leftbar">
        <div class="imgbox">
          <img src="../assets/icons/computer.png" alt="" />
        </div>
        <span>此电脑</span>
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
        <img src="../assets/fileexplorer/左.png" alt="" @click.stop="back" />
        <img src="../assets/fileexplorer/右.png" alt="" @click.stop="next" />
        <img src="../assets/fileexplorer/上.png" alt="" />
      </div>
      <div class="address">
        <img src="../assets/fileexplorer/computer.png" alt="" />
        <div class="path">
          <div
            v-for="(item, index) in state.store.state.path"
            :key="index"
            class="curpath"
            @click="clickpath(index)"
          >
            &nbsp;{{ item.name }}&nbsp;>&nbsp;
          </div>
        </div>
        <img src="../assets/fileexplorer/右.png" alt="" class="to" />
      </div>
      <div class="search">
        <img src="../assets/fileexplorer/搜索.png" alt="" /> <span>搜索</span>
      </div>
    </div>
    <div class="content">
      <div class="sidebar">
        <div
          v-for="(item, index) in state.files"
          :key="index"
          class="sidefiles"
        >
          <sidefile
            :name="item.name"
            :img="state.fileimg[item.type - 1]"
            :childfiles="item.files"
            :fileimg="state.fileimg"
            :file="item"
            @markpath="toto"
          ></sidefile>
        </div>
      </div>
      <div class="filecontent">
        <div
          v-for="(item, index) in state.store.state.contentfile"
          :key="index"
          class="contentfile"
          @click="tochildfile(item)"
        >
          <img :src="state.fileimg[item.type - 1]" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import sidefile from "./common/sidefile.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    sidefile,
  },
  setup(props, { emit }) {
    let state = reactive({
      store: useStore(),
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
      size: true,

      files:[{
        name: "快速访问",
        type: 2,
        files: [
          {
            name: "视频", type: 5, files: [{
              name: "视频一",
              files: [],
              type: 5,
            }, {
              name: "视频二",
              files: [],
              type: 5,
            }, {
              name: "视频三",
              files: [],
              type: 5,
            }, {
              name: "视频四",
              files: [],
              type: 5,
            },]
          },
          {
            name: "音乐", type: 6, files: [
              {
                name: "音乐一",
                files: [],
                type: 6,
              }, {
                name: "音乐二",
                files: [],
                type: 6,
              }, {
                name: "音乐三",
                files: [],
                type: 6,
              }, {
                name: "音乐四",
                files: [],
                type: 6,
              },
            ]
          },
          {
            name: "文档", type: 7, files: [
              {
                name: "文档一",
                files: [],
                type: 7,
              }, {
                name: "文档二",
                files: [],
                type: 7,
              }, {
                name: "文档三",
                files: [],
                type: 7,
              }, {
                name: "文档四",
                files: [],
                type: 7,
              },
            ]
          },
          {
            name: "图片", type: 8, files: [
              {
                name: "图片一",
                files: [],
                type: 8,
              }, {
                name: "图片二",
                files: [],
                type: 8,
              }, {
                name: "图片三",
                files: [],
                type: 8,
              },
            ]
          },
          { name: "桌面", type: 9, files: [] },
          { name: "下载", type: 10, files: [] },
        ],
      },
      {
        name: "我的电脑",
        type: 1,
        files: [
          {
            name: "本地磁盘(C:)",
            type: 4,
            files: [
              {
                name: "about",
                files: [{ name: "balance", files: [], type: 11 }],
                type: 11,
              },
              {
                name: "count",
                files: [{
                  name: "document", files: [
                    {
                      name: "uuuuu",
                      files: [],
                      type: 11,
                    },
                  ], type: 11
                }],
                type: 11,
              },
            ],
          },
          {
            name: "本地磁盘(D:)", type: 4, files: [{
              name: "abab",
              files: [{ name: "bbbbbb", files: [], type: 11 }],
              type: 11,
            },
            {
              name: "cccccc",
              files: [{
                name: "ddddddd", files: [
                  {
                    name: "uuooooooo",
                    files: [],
                    type: 11,
                  }
                ], type: 11
              }],
              type: 11,
            },]
          },
          { name: "本地磁盘(E:)", type: 4, files: [{ name: "suprise", files: [], type: 11 }] },
          { name: "本地磁盘(F:)", type: 4, files: [{ name: "这你也能翻到", files: [], type: 11 }] },
        ],
      },
      {
        name: "网络",
        type: 3,
        files: [],
      },],
    });
    //递归组件最后返回到这 把清空的标志重新设置
    const toto = () => {
      state.store.commit("changeflag");
    };
    const close = () => {
      emit("closeComputer");
    };
    const tochildfile = (files: any) => {
      state.store.commit("refreshcontentfile", files.files);
      state.store.commit("pushpath", files);
    };
    const bigorsmall = () => {
      state.size = !state.size;
    };
    //点击地址栏事件触发
    const clickpath = (index: Number) => {
      state.store.commit("clickpath", index);
    };
    const back = () => {
      state.store.commit("backpath");
    };
    const next = () => {
      state.store.commit("nextpath");
    };
    const mousedown = (event:any) => {
      var event = event || window.event;
      var _target:HTMLElement = document.querySelector('#mycomputer') as HTMLElement;
      console.log(_target)
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
      mouseup,
      mousedown,
      next,
      back,
      clickpath,
      close,
      bigorsmall,
      state,
      toto,
      tochildfile,
    };
  },
});
</script>

<style lang="scss">
.bigmycomputer {
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
    font-size: 18px;
    .tofrom {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 10%;
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
      width: 70%;
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
      width: 15%;
      padding: 10px;
      height: calc(94vh - 32px - 40px - 50px - 5px);
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
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          margin: 5px;
          width: 60px;
          height: 60px;
        }
        &:hover {
          background-color: rgb(199, 218, 231);
        }
      }
    }
  }
}
.smallmycomputer {
  @extend .bigmycomputer;
  transform: scale(0.6);
}
</style>