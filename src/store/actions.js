//   vuex主模块actions
export default {
  // (demo  可删除）
  increment (context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('increment');
        resolve();
      }, 1000);
    });
  }
};
