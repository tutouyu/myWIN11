import { createStore } from 'vuex'

export default createStore({
  state: {
    path: [{
      name: 'this pc',
      files: [{
        name: "快速访问",
        type: 2,
        files: [
          { name: "视频", type: 5, files: [] },
          { name: "音乐", type: 6, files: [] },
          { name: "文档", type: 7, files: [] },
          { name: "图片", type: 8, files: [] },
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
                name: "a",
                files: [{ name: "b", files: [], type: 11 }],
                type: 11,
              },
            ],
          },
          { name: "本地磁盘(D:)", type: 4, files: [] },
          { name: "本地磁盘(E:)", type: 4, files: [] },
          { name: "本地磁盘(F:)", type: 4, files: [] },
        ],
      },
      {
        name: "网络",
        type: 3,
        files: [],
      },]
    }],
    pathflag: true,
    nextpath: [],
    lastpath: [[{
      name: 'this pc',
      files: [{
        name: "快速访问",
        type: 2,
        files: [
          { name: "视频", type: 5, files: [] },
          { name: "音乐", type: 6, files: [] },
          { name: "文档", type: 7, files: [] },
          { name: "图片", type: 8, files: [] },
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
                name: "a",
                files: [{ name: "b", files: [], type: 11 }],
                type: 11,
              },
            ],
          },
          { name: "本地磁盘(D:)", type: 4, files: [] },
          { name: "本地磁盘(E:)", type: 4, files: [] },
          { name: "本地磁盘(F:)", type: 4, files: [] },
        ],
      },
      {
        name: "网络",
        type: 3,
        files: [],
      },]
    }]] as any,
    lastfiles: [] as any,
    historylength: 0,
    opennum: 0,
    deletenum: 0,
    recovernum: 0,
    deskicon: [
      { name: "此电脑", img: require("../assets/icons/computer.png"), type: 0 },
      { name: "回收站", img: require("../assets/icons/trash-full.png"), type: 1 },
      { name: "浏览器", img: require("../assets/icons/edge.png"), type: 2 },
      { name: "空文件夹", img: require("../assets/icons/explorer.png"), type: 3 },
      { name: "vscode", img: require("../assets/icons/vscode.png"), type: 4 },
      { name: "github", img: require("../assets/icons/github.png"), type: 5 },
    ],
    binfiles: [
      {
        name: "垃圾1",
        img: require("../assets/icons/explorer.png"),
        type: 4,
      }, {
        name: "垃圾2",
        img: require("../assets/icons/explorer.png"),
        type: 4,
      }, {
        name: "垃圾3",
        img: require("../assets/icons/explorer.png"),
        type: 4,
      }, {
        name: "垃圾4",
        img: require("../assets/icons/explorer.png"),
        type: 4,
      }, {
        name: "垃圾5",
        img: require("../assets/icons/explorer.png"),
        type: 4,
      },
    ],
    contentfile: [
      {
        name: "快速访问",
        type: 2,
        files: [
          { name: "视频", type: 5, files: [] },
          { name: "音乐", type: 6, files: [] },
          { name: "文档", type: 7, files: [] },
          { name: "图片", type: 8, files: [] },
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
                name: "a",
                files: [{ name: "b", files: [], type: 11 }],
                type: 11,
              },
            ],
          },
          { name: "本地磁盘(D:)", type: 4, files: [] },
          { name: "本地磁盘(E:)", type: 4, files: [] },
          { name: "本地磁盘(F:)", type: 4, files: [] },
        ],
      },
      {
        name: "网络",
        type: 3,
        files: [],
      },
    ] as any,
  },
  mutations: {
    //确定恢复的文件是第几个
    recovernum: function (state, num) {
      state.recovernum = num;
    },
    recovericon: function (state, num) {
      let item = { ...state.binfiles[num] }
      state.deskicon.push(item)
      state.binfiles.splice(num, 1)
    },
    openicon: function (state, num) {
      state.opennum = num
    },
    //确定右键打开的文件是第几个
    deleteiconnum: function (state, num) {
      state.deletenum = num
    },
    deleteicon: function (state, num) {
      let item = { ...state.deskicon[num] }
      state.binfiles.push(item);
      state.deskicon.splice(num, 1);
    },
    //右键排序
    iconsort: function (state) {
      interface fileicon {
        name: String,
        img: String,
        type: Number,
      }
      let compare = function (obj1: fileicon, obj2: fileicon) {
        let val1 = obj1.name[0];
        let val2 = obj2.name[0];
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      state.deskicon.sort(compare)
    },
    //新建文件
    newfile: function (state) {
      state.deskicon.push({ name: "空文件夹", img: require("../assets/icons/explorer.png"), type: 3 })
    },
    pushpath: function (state, address) {
      let item = JSON.parse(JSON.stringify(state.path))
      state.lastpath.push(item)
      state.path.push(address)
    },
    //点击地址栏修改内容显示和地址显示
    clickpath: function (state, index) {
      state.path.splice(index + 1, state.path.length - index - 1)
      state.contentfile.splice(0, state.contentfile.length);
      state.contentfile = state.path[index].files;
    },
    //侧边栏组件向上递归时添加当前地址
    reditpath: function (state, params) {
      state.path.unshift(params);
    },
    clearpath: function (state) {
      state.path.splice(0, state.path.length);
    },
    //侧边栏递归结束记录历史
    endpushpath: function (state) {
      let item = JSON.parse(JSON.stringify(state.path));
      state.lastpath.push(item)//侧边栏递归后结束后记录地址历史
    },
    //子文件递归emit时第一次清空历史记录 
    changeflag: function (state) {
      state.pathflag = !state.pathflag;
    },
    changcontentfile: function (state, files: any) {
      state.contentfile.splice(0, state.contentfile.length);
      for (let i = 0; i < files.length; i++) {
        state.contentfile.push(files[i]);
      }
    },
    //更改内容里显示的文件
    refreshcontentfile: function (state, files) {
      state.contentfile = files;
    },
    //历史回退
    backpath: function (state) {
      if (state.lastpath.length >= 1) {
        console.log(Array.isArray(state.path))
        state.path = state.lastpath[state.lastpath.length - 1]
        console.log(Array.isArray(state.path))
        state.contentfile = state.path[state.path.length - 1].files
        state.lastpath.pop()
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
