<template>
  <div>
    <div class="wrap">
      <el-button @click="dialogVisible = true">
        显示弹窗
      </el-button>
    </div>

    <auto-form
      :visible.sync="dialogVisible"
      :fields="fields"
      title="活动表单"
      @submit="submit"
      @cancel="cancel"
    />
  </div>
</template>

<script>
export default {
  components:{
    'auto-form' : ()=>import('../src/public/auto-form/index.vue')
  },
  data() {
    return {
      dialogVisible:false,
      fields:[
        {
          name:'name',
          type:'input',
          label:'活动名称',
          options:{
            disabled:false,
            initialValue:'活动名称',
            rules:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          }
        },
        {
          name:'region',
          type:'select',
          label:'活动区域',
          itemList:[
            {
              label:'上海',
              value:'shanghai'
            },
            {
              label:'北京',
              value:'beijing'
            },
          ],
          options:{
            disabled:false,
            initialValue:'活动区域',
            rules:[
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
          }
        },
        {
          name:'date',
          type:'date',
          label:'活动时间',
          options:{
            disabled:false,
            initialValue:new Date(),
            rules:[
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]
          }
        },
        {
          name:'delivery',
          type:'switch',
          label:'即时配送',
          options:{
            disabled:false,
            initialValue:true,
            rules:[
            ]
          }
        },
        {
          name:'type',
          type:'checkbox',
          label:'活动性质',
          itemList:[
            {
              label:'美食/餐厅线上活动',
              value:'1'
            },
            {
              label:'地推活动',
              value:'2'
            },
            {
              label:'线下主题活动',
              value:'3'
            },
            {
              label:'单纯品牌曝光',
              value:'4'
            },
          ],
          options:{
            disabled:false,
            initialValue:['1', '2'],
            rules:[
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
          }
        },
        {
          name:'resource',
          type:'radio',
          label:'特殊资源',
          itemList:[
            {
              label:'线上品牌商赞助',
              value:'1'
            },
            {
              label:'线下场地免费',
              value:'2'
            }
          ],
          options:{
            disabled:false,
            initialValue:'1',
            rules:[
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ]
          }
        },
        {
          name:'desc',
          type:'textarea',
          label:'活动形式',
          options:{
            disabled:false,
            initialValue:'活动形式',
            rules:[
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        },
      ]
    };
  },
  computed: {},
  watch: {},
  created: function () {

  },
  mounted: function () {
    this.$emit('setCode', '/auto-form-test.vue');
    this.$emit('setInfo', '可配置的表单弹窗');
  },
  methods: {
    submit(data){
      console.log(data);
    },
    cancel(){
      this.dialogVisible = false;
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
