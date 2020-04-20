<!--查看大图demo-->
<template>
  <div>
    <div>
      <el-button
        v-for="item in 5"
        :key="item"
        type="primary"
        @click="showDialog(item)"
      >
        类型{{ item }}
      </el-button>
    </div>
    <detail-view-dialog
      :visible.sync="bigPicShow"
      :component-type="dialogType"
      :is-confirm="false"
      :dialog-data="data"
    />
  </div>
</template>

<script>
import DetailViewDialog from '../src/public/detail-view-dialog/detail-view-dialog';
import scenePic from './img/scene.jpg';
import capturePic from './img/capture.jpg';
import idPic from './img/id.jpg';
export default {
  name: 'DetailViewDialogDemo',
  components: {DetailViewDialog},
  data() {
    return {
      bigPicShow: false,
      dialogType: 1,
      data: [{
        'scene': {'src': scenePic},
        'capture': {
          'src': capturePic,
          'deviceName': '湖里区BRT集美大桥南站西侧入口',
          'captureTime': '2019-12-24 07:33:49',
          'similarity': 77.05628
        },
        'id': {
          'personName': '马*美',
          'idCard': '3502051********0025',
          'src': idPic,
          'label': ['重点|精神']
        }
      }],
    };
  },
  mounted() {
    this.$emit('setCode', '/demo/detail-view-dialog-demo.vue');
    this.$emit('setInfo', '查看大图的范例，使用前应该对后端给的数据进行重构');
  },
  methods:{
    showDialog(type){
      this.dialogType = type;
      this.bigPicShow = true;
    }
  }
};
</script>

<style scoped>

</style>
