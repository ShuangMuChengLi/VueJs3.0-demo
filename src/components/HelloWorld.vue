
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
    <h1>markerdown</h1>
    <Markerdown />
    <h1>svg</h1>
    <div>
      <!-- Use the polygraph component -->
      <svg width="200" height="200">
        <polygraph :stats="svgState"></polygraph>
      </svg>
      <!-- controls -->
      <div v-for="stat in svgState" :key="stat.label">
        <label>{{stat.label}}</label>
        <input type="range" v-model="stat.value" min="0" max="100">
        <span>{{stat.value}}</span>
        <button @click="remove(stat)" class="remove">X</button>
      </div>
      <form id="add">
        <input name="newlabel" v-model="newLabel">
        <button @click="add">Add a Stat</button>
      </form>
      <pre id="raw">{{ svgState }}</pre>
    </div>
    <h1>commits</h1>
    <commits />
  </div>
</template>
<script>
import Grid from '@/components/Grid.vue';
import TreeItem from '@/components/TreeItem.vue';
import { reactive, ref } from 'vue';
import Markerdown from './Markerdown';
import Polygraph from './Polygraph';
import Commits from './Commits';
export default {
  name: 'HelloWorld',
  components: {
    Commits,
    Markerdown,
    Grid,
    TreeItem,
    Polygraph
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

    const newLabel = ref('');
    const svgState = reactive([
      { label: 'A', value: 100 },
      { label: 'B', value: 100 },
      { label: 'C', value: 100 },
      { label: 'D', value: 100 },
      { label: 'E', value: 100 },
      { label: 'F', value: 100 }
    ]);
    function add (e) {
      e.preventDefault();
      if (!newLabel.value) return;
      svgState.push({
        label: newLabel.value,
        value: 100
      });
      newLabel.value = '';
    }
    function remove (stat) {
      if (svgState.length > 3) {
        svgState.splice(svgState.indexOf(stat), 1);
      } else {
        alert('Can\'t delete more!');
      }
    }

    return {
      gridState,

      treeState,

      svgState,
      add,
      remove,
      newLabel
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
