<!--
放大镜大图弹窗demo
 -->
<template>
  <div>
    <view-pic-dialog
      :visible.sync="bigPicVisible"
      :index="index"
      :list="tableData"
    />
    <div>
      <el-button
        type="primary"
        @click="bigPicVisible = !bigPicVisible"
      >
        显示弹窗
      </el-button>
    </div>
  </div>
</template>

<script>
import ViewPicDialog from '../src/public/view-pic-dialog/view-pic-dialog';
import carPic from './img/car.jpg';
export default {
  name: 'ViewPicDialogDemo',
  components: {ViewPicDialog},
  data(){
    return {
      bigPicVisible:false,
      index:0,
      tableData:[
        {
          src: carPic,
          license:'粤222222',
          passTime:'2019-07-7 14:30:46',
          bayonet:'石星路与路口',
          carBrand: '品牌',
          carColor:'黑色',
          carType:'卡车'
        },
        {
          src: carPic,
          license:'粤222233',
          passTime:'2019-07-7 14:30:46',
          bayonet:'石星路与路口',
          carBrand: '卡车',
          carColor:'黑色',
          carType:'卡车'
        },
      ]
    };
  }
};
</script>

<style scoped>

</style>
