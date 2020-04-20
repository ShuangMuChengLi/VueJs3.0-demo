<template>
  <div>
    worker test
  </div>
</template>

<script>
import fileWorker from './file.worker.js';
export default {
  name: 'WorkerDemo',
  mounted() {
    this.initWorker();
    this.$emit('setCode', '/demo/worker-demo.vue');
    this.$emit('setInfo',
      `<h3>指令：web worker文件加载</h3>
        <p>file.worker.js为web worker文件</p>
        <p>worker.js结尾的文件将被识别为web worker文件</p>`
    );
  },
  methods:{
    initWorker(){
      const worker = new fileWorker();

      worker.addEventListener('message', (event) => {
        console.log(event.data);

        this.$message.success('从worker获取到了：' + event.data.a);
      });
      worker.postMessage({ a: 'from parent' });
    }
  }
};
</script>

<style scoped>

</style>
