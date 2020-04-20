<template>
  <div>
    <div
      v-click-outside="onClickOutside"
      class="block green"
    >
      A
    </div>
    <div
      v-click-outside="vcoConfig"
      class="block red"
    >
      B
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vcoConfig: {
        'handler': this.handler,
        'middleware': this.middleware,
        'events': ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        'isActive': true
      }
    };
  },
  mounted() {
    this.$emit('setCode', '/v-click-outside-demo.vue');
    this.$emit('setInfo', `
        <h3>指令：v-click-outside</h3>
        点击区域外触发事件的指令：可用于自定义下拉框，弹窗的关闭事件 <br />
        <a href="https://github.com/ndelvalle/v-click-outside">https://github.com/ndelvalle/v-click-outside</a>   <br />
        Vue directive to react on clicks outside an element without stopping the event propagation. Great for closing dialogues, menus among other things.`
    );
  },
  methods: {
    onClickOutside(event, el) {
      this.$message.success('A outside');
      console.log('Clicked outside. Event: ', event, el);
    },

    handler(event, el) {
      this.$message.success('B outside');
      console.log('Clicked outside. Event: ', event, el);
    },
    // Note: The middleware will be executed if the event was fired outside the element.
    //       It should have only sync functionality and it should return a boolean to
    //       define if the handler should be fire or not
    middleware(event, el) {
      return event.target.className !== 'modal';
    }
  }
};
</script>

<style scoped lang="less">
  .block {
    width: 100px;
    height: 100px;
    margin: 20px;
    line-height: 100px;
    color: #fff;
    text-align: center;
  }

  .green {
    background-color: #63a35c;
  }

  .red {
    background-color: #e72521;
  }
</style>
