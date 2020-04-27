
<template>
  <div class="hello">
    <h1>表格筛选</h1>
    <form id="search">
      Search <input name="query" v-model="gridState.searchQuery">
    </form>
    <Grid
      :data="gridState.gridData"
      :columns="gridState.gridColumns"
      :filter-key="gridState.searchQuery">
    </Grid>
    <h1>树形</h1>
    <ul>
      <tree-item class="item" :model="treeState.treeData"></tree-item>
    </ul>
  </div>
</template>
<script>
import Grid from '@/components/Grid.vue';
import TreeItem from '@/components/TreeItem.vue';
import { reactive } from 'vue';
export default {
  name: 'HelloWorld',
  components: {
    Grid,
    TreeItem
  },
  setup (props) {
    const gridState = reactive({
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ],
      treeData: {
        name: 'My Tree',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              }
            ]
          }
        ]
      }
    });
    const treeState = reactive({
      treeData: {
        name: 'My Tree',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              }
            ]
          }
        ]
      }
    });

    return {
      gridState,
      treeState
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
