<template>
  <div>
    首页(demo  可删除）
    <div>
      <span class="iconfont icon-icon-shanchu" />
    </div>
    <a href="javascript:void(0)"> 111</a>
    <div>{{ count }}</div>
    <i class="el-icon-edit" />
    <i class="el-icon-share" />
    <i class="el-icon-delete" />
    <el-button
      type="primary"
      icon="el-icon-search"
      @[eventName]="clickEvent"
    >
      搜索
    </el-button>
    <img :src="src">
    <div class="img" />
    <el-button
      type="text"
      @click="table = true"
    >
      打开嵌套表格的 Drawer
    </el-button>
    <el-drawer
      title="我嵌套了表格!"
      :visible.sync="table"
      direction="rtl"
      size="50%"
    >
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        />
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        />
        <el-table-column
          property="address"
          label="地址"
        />
      </el-table>
    </el-drawer>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters} from 'vuex';
export default {
  components: {},
  data() {
    return {
      src:null,
      eventName:'click',
      table: false,
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    };
  },
  computed: {
    ...mapState({
      // 传字符串参数 'count' 等同于 `state => state.count`
      count: 'count',
      //      subCount: 'subCount',
      subCount: state=>state.subStore.subCount
    }),
    ...mapGetters({
      doubleCount:'subStore/doubleCount'
    })
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    async init(){
      this.add();
      // this.subIncrement();
      this.$store.commit('subStore/increment');
      this.$store.commit('subStore/increment');
      this.$store.commit('subStore/increment');
      console.log('doubleCount', this.doubleCount);
      console.log('subCount', this.subCount);
      console.log('count', this.count);
      Array.from(new Set([1, 2, 3, 2, 1])); // => [1, 2, 3]
      [1, [2, 3], [4, [5]]].flat(2); // => [1, 2, 3, 4, 5]
      Promise.resolve(32).then(x => console.log(x)); // => 32
    },
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      subIncrement: 'subStore/increment' // 将 `this.subIncrement()` 映射为 `this.$store.commit('subStore/increment')`
    }),
    ...mapActions({
      addAction: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    clickEvent(){
      console.log('clickEvent');
    },
    handleClose(done) {

    }
  }
};
</script>

<style scoped lang="less">
  @import "../../css/index";
</style>
