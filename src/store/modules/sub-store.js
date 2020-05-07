// vuex子模块  (demo  可删除）
export default {
  namespaced: true,
  state: { subCount: 0 },
  mutations: {
    increment (state) {
      console.log('sub')
      // 这里的 `state` 对象是模块的局部状态
      state.subCount++
    }
  },
  getters: {
    doubleCount (state) {
      return state.subCount * 2
    }
  }
}
