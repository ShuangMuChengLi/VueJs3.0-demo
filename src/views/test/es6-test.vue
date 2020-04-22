<template>
  <div>
    Es6Test
  </div>
</template>

<script>

export default {
  name: 'Es6Test',
  data () {
    return {
      loginType: true
    };
  },
  mounted () {
    const obj = {
      a: 1
    };
    console.log(obj?.a);
    this.classDecoratorsTest();
  },
  methods: {
    classDecoratorsTest () {
      function log (a, b, c, d) {
        console.log(a, b, c, d);
      }
      @log
      class ClassWithPrivateField {
        constructor () {
          this.a = 1;
        }
      }
      const instance = new ClassWithPrivateField({ test: 1 });
      console.log(instance.a);
    }
  }
};
</script>

<style scoped>

</style>
