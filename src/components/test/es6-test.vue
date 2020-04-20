<template>
  <div>
    Es6Test
  </div>
</template>

<script>
import {util} from '../../js/tools/util';
import {mathUtil} from '../../js/tools/math-util';

export default {
  name: 'Es6Test',
  data(){
    return {
      loginType:true
    };
  },
  mounted() {
    let obj = {
      a: 1
    };
    console.log(obj?.a);
    this.bigIntTest();
    this.classDecoratorsTest();

  },
  methods:{
    bigIntTest(){
      /**
       * 获取棋盘稻米数量
       * @param count bigint 棋盘格数
       * @returns {bigint}
       */
      function getRiceCount(count){
        let result = BigInt(0);
        for(let i = BigInt(0); i < count; i++){
          result += mathUtil.bigIntPow(BigInt(2), i);
        }
        return result;
      }
      let riceCount = getRiceCount(BigInt(64));
      let count = 18446744073709551615;
      let result = count / 4000 / 1000 / 10000 / 10000;
      console.log(riceCount);
    },
    classDecoratorsTest(){
      function log(a, b, c, d) {
        console.log(a, b, c, d);

      }
      @log
      class ClassWithPrivateField {

        constructor() {
          this.a = 1;
        }
      }

      const instance = new ClassWithPrivateField({test: 1});
      // instance.#privateField === 42; // Syntax error
    },
    treeFilterTest(){
      let list = [ ['a1', 'a2'], ['b1', 'b2']];
      let result = util.combination(list);

      let tree = [
        {
          id: 1,
          children:[
            {
              id: 11,
              children:[
                {
                  id: 111,
                  children:[

                  ]
                },
              ]
            },
            {
              id: 12,
              children:[
                {
                  id: 121,
                  children:[

                  ]
                },
              ]
            }
          ]
        },
        {
          id: 2,
          children:[
            {
              id: 21,
              children:[
                {
                  id: 211,
                  children:[

                  ]
                },
              ]
            },
            {
              id: 22,
              children:[
                {
                  id: 221,
                  children:[

                  ]
                },
              ]
            }
          ]
        },
      ];
      let filterCondition = [221, 121];
      console.log(JSON.stringify(util.treeFilter(tree, filterCondition)));
    }
  }
};
</script>

<style scoped>

</style>
