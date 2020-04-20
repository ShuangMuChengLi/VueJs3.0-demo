<template>
  <div
    id="content"
    style="height: 300px; overflow-y: auto; border: 1px solid #999;"
  >
    <a
      v-scroll-to="scrollOption"
      href="javascript:void(0)"
    >Scroll to #element</a>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <p>some content</p>
    <div id="element">
      Hi. I'm #element.
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueScrolltoDemo',
  data(){
    return {
      scrollOption:{
        el: '#element',
        container: '#content',
        duration: 500,
        easing: 'linear',
        offset: -200,
        force: true,
        cancelable: true,
        onStart: ()=>{},
        onDone: ()=>{},
        onCancel: ()=>{},
        x: false,
        y: true
      }
    };
  },
  mounted() {
    this.$emit('setCode', '/demo/vue-scrollto-demo.vue');
    this.$emit('setInfo',
      `<h3>指令：v-scroll-to</h3>
        滚动到指定位置的指令<br />
        <a href="https://github.com/rigor789/vue-scrollTo">https://github.com/rigor789/vue-scrollTo</a>`
    );
  },
};
</script>

<style scoped>

</style>
