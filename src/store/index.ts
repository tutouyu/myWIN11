import { createStore } from 'vuex'

export default createStore({
  state: {
    path: ["this pc"],
    pathflag: true,
    lastpath: [["this pc"]] as any,
    lastfiles: [] as any,
    historylength: 0,
    binfiles: [
      {
        name: "垃圾1",
        type: 10,
      }, {
        name: "垃圾2",
        type: 10,
      }, {
        name: "垃圾3",
        type: 10,
      }, {
        name: "垃圾4",
        type: 10,
      }, {
        name: "垃圾5",
        type: 10,
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
