<template>
  <div id="editor" style="display: flex">
    <textarea :value="input" @input="update" style="width: 500px;height: 400px;"></textarea>
    <div v-html="output"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import marked from 'marked';
import _ from 'lodash';
export default {
  name: 'Markerdown',
  setup () {
    const input = ref('# hello');
    const output = computed(() => marked(input.value));
    const update = _.debounce(e => { input.value = e.target.value; }, 16);

    return {
      input,
      output,
      update
    };
  }
};
</script>

<style scoped>

</style>
