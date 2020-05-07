<template>
  <div id="editor" style="display: flex">
    <textarea :value="state.input" @input="update" style="width: 500px;height: 400px;"></textarea>
    <div v-html="output"></div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import marked from 'marked'
import _ from 'lodash'
export default {
  name: 'Markerdown',
  setup () {
    const state = reactive({
      input: `# hello
1. hello
2. world`
    })
    const output = computed(() => marked(state.input))
    const update = _.debounce(e => { state.input = e.target.value }, 16)

    return {
      state,
      output,
      update
    }
  }
}
</script>

<style scoped>
  /deep/ol{
    list-style-type: decimal ;
    padding-left: 40px;
  }
</style>
