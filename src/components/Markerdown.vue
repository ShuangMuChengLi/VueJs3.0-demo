<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div v-html="output"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Markerdown',
  setup () {
    const input = ref('# hello');
    const output = computed(() => marked(input.value, { sanitize: true }));
    const update = _.debounce(e => { input.value = e.target.value; }, delay);

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
