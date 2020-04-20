<template>
  <div>
    <ul class="ul">
      <li
        v-for="(item, key) of list"
        :key="key"
        class="li"
        draggable="true"
        @dragstart="dragstart($event,key)"
        @drop.prevent="drop($event,key)"
        @dragover.prevent
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Draggable',
  data(){
    return {
      list: [
        1,
        2,
        3,
      ],
      sourceIndex:null,
      targetIndex:null,
    };
  },
  mounted() {
    this.$emit('setCode', '/demo/draggable.vue');
    this.$emit('setInfo', `拖动其中一项到另一项上
    `);
  },
  methods:{
    dragstart(event, key){
      this.sourceIndex = key;
    },
    drop(event, key){
      event.preventDefault();
      this.targetIndex = key;
      this.list = this.exchange(this.list, this.sourceIndex, this.targetIndex);
      // 将拖动的元素到所选择的放置目标节点中
    },
    exchange(list, indexOne, indexTwo){
      console.log(list, indexOne, indexTwo);
      if(indexOne > indexTwo){
        [indexOne, indexTwo] = [indexTwo, indexOne];
      }
      let tempList = _.cloneDeep(list);
      let del = tempList.splice(indexOne, 1)[0];
      console.log(del);
      let del2 = tempList.splice(indexTwo - 1, 1, del)[0];
      console.log(del2);
      tempList.splice(indexOne, 0, del2);
      return tempList;
    }
  }
};
</script>

<style scoped>
  .li{
    line-height: 2;
    margin: 10px;
    border: 1px solid #333;
    cursor: move;
  }
</style>
