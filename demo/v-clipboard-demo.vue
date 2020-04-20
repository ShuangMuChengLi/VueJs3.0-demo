<template>
  <div>
    <el-button v-clipboard="clipboardValue">
      Copy to clipboard
    </el-button>
    <el-button v-clipboard="clipboardAction">
      Copy to clipboard （function)
    </el-button>
    <el-button @click="clipboardMethod">
      Copy to clipboard （method)
    </el-button>
    <p>
      <el-input
        v-model="textareaValue"
        type="textarea"
        placeholder="点击后，黏贴这里试试"
      />
    </p>
  </div>
</template>

<script>
export default {
  name:'VClipboardDemo',
  data() {
    return {
      clipboardValue: 'Copy to clipboard',
      textareaValue:''
    };
  },
  mounted() {
    this.$emit('setCode', '/v-clipboard-demo.vue');
    this.$emit('setInfo',
      `<h3>指令：v-clipboard</h3>
        剪切板操作的指令<br />
        <a href="https://github.com/euvl/v-clipboard">https://github.com/euvl/v-clipboard</a>`
    );
  },
  methods: {
    clipboardAction(){
      this.$message.success('写入剪切板成功');
      return 'Copy to clipboard （function)';
    },
    clipboardMethod(){
      this.$message.success('写入剪切板成功');
      this.$clipboard('Copy to clipboard （method)');
    }
  }
};
</script>

<style scoped lang="less">
</style>
