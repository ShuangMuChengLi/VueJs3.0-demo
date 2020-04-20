<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @close="cancel"
  >
    <el-form
      :ref="formName"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div
        v-for="(item) in fields"
        :key="item.name"
      >
        <el-form-item
          v-if="item.type === 'input'"
          :label="item.label"
          :prop="item.name"
        >
          <el-input v-model="ruleForm[item.name]" />
        </el-form-item>
        <el-form-item
          v-if="item.type === 'select'"
          :label="item.label"
          :prop="item.name"
        >
          <el-select
            v-model="ruleForm[item.name]"
            placeholder=""
          >
            <el-option
              v-for="subItem in item.itemList"
              :key="subItem.value"
              :label="subItem.label"
              :value="subItem.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'date'"
          :label="item.label"
          :prop="item.name"
          required
        >
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker
                v-model="ruleForm[item.name]"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'switch'"
          :label="item.label"
          :prop="item.name"
        >
          <el-switch v-model="ruleForm[item.name]" />
        </el-form-item>
        <el-form-item
          v-if="item.type === 'checkbox'"
          :label="item.label"
          :prop="item.name"
        >
          <el-checkbox-group v-model="ruleForm[item.name]">
            <el-checkbox
              v-for="subItem in item.itemList"
              :key="subItem.value"
              :label="subItem.value"
              :name="item.name"
            >
              {{ subItem.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'radio'"
          :label="item.label"
          :prop="item.name"
        >
          <el-radio-group v-model="ruleForm[item.name]">
            <el-radio
              v-for="subItem in item.itemList"
              :key="subItem.value"
              :label="subItem.value"
            >
              {{ subItem.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'textarea'"
          :label="item.label"
          :prop="item.name"
        >
          <el-input
            v-model="ruleForm[item.name]"
            type="textarea"
          />
        </el-form-item>
      </div>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="submit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
    'visible':{
      'type':Boolean,
      'default':false
    },
    'fields':{
      'type':Array,
      'default':function () {
        return [];
      }
    },
    'title':{
      'type':String,
      'default':''
    },
  },
  data() {
    return {
      formName:'formName' + new Date().getTime(),
      ruleForm: {
      },
      rules: {

      },
      dialogVisible:false
    };
  },
  computed: {
  },
  watch: {
    fields(){
      this.changeFields();
    },
    visible(){
      this.dialogVisible = this.visible;
    }
  },
  created: function () {

  },
  mounted: function () {
    this.changeFields();
  },
  methods: {
    changeFields(){
      for(let item of this.fields){
        if(!item.options)return;

        this.$set(this.ruleForm, item.name, item.options.initialValue || null);
        this.$set(this.rules, item.name, item.options.rules || []);
      }
    },
    submit(){
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.ruleForm);
        } else {
          return false;
        }
      });
    },
    cancel(){
      this.$emit('cancel' );
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
