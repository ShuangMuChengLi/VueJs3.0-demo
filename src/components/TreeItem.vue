<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      {{model.name}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-if="isFolder" v-show="open">
      <tree-item
        class="item"
        v-for="(model, key) in model.children"
        :key="key"
        :model="model">
      </tree-item>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'
export default {
  name: 'TreeItem', // necessary for self-reference
  template: '#item-template',
  props: {
    model: Object
  },
  setup (props) {
    const state = reactive({
      open: false,
      isFolder: computed(() => {
        return props.model.children && props.model.children.length
      })
    })

    function toggle () {
      state.open = !state.open
    }

    function changeType () {
      if (!state.isFolder) {
        props.model.children = []
        addChild()
        state.open = true
      }
    }

    function addChild () {
      props.model.children.push({ name: 'new stuff' })
    }

    return {
      ...toRefs(state),
      toggle,
      changeType,
      addChild
    }
  }
}
</script>

<style scoped>
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
