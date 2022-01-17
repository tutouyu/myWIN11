import { createStore } from 'vuex'

export default createStore({
  state: {
    path: ["this pc"],
    pathflag: true,
    lastpath: [["this pc"]] as any,
    lastfiles: [] as any,
    historylength: 0,
    opennum: 0,
    deletenum: 0,
    recovernum:0,
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
    recovernum:function(state,num){
      state.recovernum=num;
    },
    recovericon:function(state,num){
      let item = { ...state.binfiles[num] }
      state.deskicon.push(item)
      state.binfiles.splice(num,1)
    },
    openicon: function (state, num) {
      state.opennum = num
    },
    deleteiconnum: function (state, num) {
      state.deletenum = num
    },
    deleteicon: function (state, num) {
      let item = { ...state.deskicon[num] }
      state.binfiles.push(item);
      state.deskicon.splice(num, 1);
    },
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
    newfile: function (state) {
      state.deskicon.push({ name: "空文件夹", img: require("../assets/icons/explorer.png"), type: 4 })
    },
    pushpath: function (state, address) {
      state.historylength++;
      state.lastpath.push(state.path)
      state.path.push(address)
    },
    reditpath: function (state, params) {
      state.path.unshift(params);
    },
    clearpath: function (state) {
      state.path.splice(0, state.path.length);
    },
    changeflag: function (state) {
      state.pathflag = !state.pathflag;
    },
    changcontentfile: function (state, files: any) {
      state.lastfiles.push(state.contentfile)
      state.contentfile.splice(0, state.contentfile.length);
      for (let i = 0; i < files.length; i++) {
        state.contentfile.push(files[i]);
      }
    },
    refreshcontentfile: function (state, files) {
      state.contentfile = files;
    },
    backpath: function (state) {
      for (let i = 0; i < state.historylength; i++) {
        console.log(state.lastpath[i])
      }
      state.contentfile = state.lastfiles[state.historylength]
      state.lastfiles.pop()
      state.path = state.lastpath[state.historylength]
      state.lastpath.pop()
    }
  },
  actions: {
  },
  modules: {
  }
})
