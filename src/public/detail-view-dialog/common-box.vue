<template>
  <div class="common-big-pic-component-div">
    <el-dialog
      :visible.sync="dialogBoxInnerShow"
      :custom-class="getClass"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :lock-scroll="false"
    >
      <div
        slot="title"
        class="common-header-div"
      >
        <span>{{ title }}</span>
        <i
          class="icon-close"
          @click="closeWindow()"
        />
      </div>
      <!--主体-->
      <div class="dialog-main">
        <div class="dialog-main-div">
          <slot name="main" />
        </div>
      </div>
      <!--中间部分（是否确认同一人）-->
      <slot name="middle" />
      <!--尾部-->
      <div class="dialog-footer">
        <slot name="footer" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommonBox',
  props: {
    dialogBoxShow: {
      type: Boolean,
      default: false
    },
    //标题
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      dialogBoxInnerShow: false,
    };
  },
  computed: {
    getClass() {
      let str = 'common-dialog';
      if (this.className) {
        str = str + ' ' + this.className;
      }
      return str;
    }
  },
  watch: {
    dialogBoxShow: {
      handler(val) {
        this.dialogBoxInnerShow = val;
      },
      immediate: true
    },
  },
  methods: {
    /**
       * 提交表单
       */
    submit() {
      this.$emit('submit', true);
    },
    //关闭窗口
    closeWindow() {
      this.$emit('closeWindow', false);
    }
  }
};
</script>

<style scoped lang="less">
  @import "./common-box";
</style>
