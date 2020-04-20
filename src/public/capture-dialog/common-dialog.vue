<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogBoxInnerShow"
    :custom-class="getClass"
    :width="width"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :lock-scroll="false"
    @close="closeWindow()"
  >
    <div>
      <slot />
    </div>
    <div
      v-if="isNeedFooter"
      slot="footer"
    >
      <slot name="bottom">
        <span
          v-if="!isEdit"
          class="btn-style btn-blue"
          @click="submit()"
        >
          确定
        </span>
        <span
          v-if="!isEdit"
          class="btn-style btn-grey"
          @click="closeWindow()"
        >
          取消
        </span>
        <span
          v-if="isEdit"
          class="btn-style btn-blue"
          @click="changeEdit()"
        >
          编辑
        </span>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    dialogBoxShow:{
      type:Boolean,
      default:false
    },
    className:{
      type:String,
      default:''
    },
    //是否编辑模式
    isEdit:{
      type:Boolean,
      default:false
    },
    // 宽度
    width:{
      type:String,
      default:''
    },
    // 是否需要底部
    isNeedFooter: {
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      dialogBoxInnerShow:false,
    };
  },
  computed:{
    getClass(){
      let str = 'common-dialog';
      if (this.className) {
        str = str + ' ' + this.className;
      }
      return str;
    }
  },
  watch:{
    dialogBoxShow:{
      handler(val){
        this.dialogBoxInnerShow = val;
      },
      immediate:true
    },
  },
  methods:{
    /**
     * 提交表单
     */
    submit(){
      this.$emit('submit', true);
    },
    //关闭窗口
    closeWindow() {
      this.$emit('closeWindow', false);
    },
    /**
     * 改变编辑状态
     */
    changeEdit(){
      this.$emit('update:isEdit', false);
    },
  }
};
</script>

<style scoped lang="less">
  @import "css/common-dialog.less";
</style>
