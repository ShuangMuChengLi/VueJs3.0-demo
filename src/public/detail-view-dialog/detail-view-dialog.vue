<!--
  图片详情浏览窗口
-->
<template>
  <div class="big-pic-component-div">
    <common-box
      :title="'详情'"
      :dialog-box-show="dialogBoxShow"
      @closeWindow="closeWindow()"
    >
      <!--主体部分-->
      <div
        slot="main"
        class="big-pic-div"
      >
        <!--
            左边图片部分
            这个模块是公共的模块
        -->
        <div class="pic-container">
          <!--图片-->
          <div class="pic-adaption">
            <pic-adaption
              v-show="currentPicType !== 'video' || !currentMainPicSrc"
              :src="currentMainPicSrc"
              :error-img="errorImg"
            />
          </div>
          <!--视频-->
          <video
            v-if="currentPicType === 'video' && currentMainPicSrc"
            width="100%"
            height="100%"
            :src="currentMainPicSrc"
          />
          <div class="show-pic-type">
            {{ currentPicName }}
            <div
              v-if="componentType === 1 || componentType === 2 || componentType === 5"
              class="circle-div"
            >
              <span
                v-for="(item,key) in currentInfo"
                :key="key"
                class="circle-style"
                :class="{'active':currentPicType === key}"
                @click="changePicType(key)"
              />
            </div>
          </div>
        </div>
        <!--右边部分-->
        <div class="right-div">
          <!--
              此处为定制模块
              为人档抓拍大图专用
          -->
          <div
            v-if="componentType === 1 || componentType === 5"
            class="right-pic-container"
          >
            <div
              v-show="!isLog"
              class="normal-div"
            >
              <!--上部图片-->
              <div class="top-div">
                <!--图片1 -->
                <div class="pic-div">
                  <pic-adaption
                    v-if="lodash.get(currentInfo, 'capture.src')"
                    :src="lodash.get(currentInfo, 'capture.src')"
                    :error-img="errorPic"
                  />
                </div>
                <!--相似度-->
                <div class="similarity-div">
                  <span
                    v-if="lodash.get(currentInfo, 'capture.similarity')"
                  >
                    {{ Number(lodash.get(currentInfo, 'capture.similarity')).toFixed(2) }}%
                  </span>
                  <i class="icon-similarity" />
                </div>
                <!--图片2 -->
                <div class="pic-div">
                  <pic-adaption
                    v-if="lodash.get(currentInfo, 'id.src')"
                    :src="lodash.get(currentInfo, 'id.src')"
                    :error-img="errorInfo"
                  />
                </div>
              </div>
              <!--下部分信息，模式一-->
              <div
                v-if="componentType === 1"
                class="bottom-div"
              >
                <span
                  class="row-info"
                >{{ lodash.get(currentInfo, 'id.personName') }}</span>
                <span
                  class="row-info"
                >{{ lodash.get(currentInfo, 'id.idCard') }}</span>
                <div
                  v-if="lodash.get(currentInfo, 'id.label')"
                  class="label-div"
                >
                  <p-label
                    class="label-style"
                    :labels="dealPersonLabels()"
                  />
                </div>
                <span
                  v-if="lodash.get(currentInfo, 'capture.captureTime')"
                  class="row-info"
                >抓拍时间：{{ lodash.get(currentInfo, 'capture.captureTime') }}</span>
                <span
                  v-if="lodash.get(currentInfo, 'capture.deviceName')"
                  class="row-info"
                >抓拍地点：{{ lodash.get(currentInfo, 'capture.deviceName') }}</span>
              </div>
              <!--下部分信息，模式五-->
              <div
                v-if="componentType === 5"
                class="bottom-div"
              >
                <!--姓名-->
                <div class="bottom-row-div">
                  <div class="text-title">
                    姓名
                  </div>
                  ：
                  <span>{{ getPropertyFromKey('id.personName') }}</span>
                </div>
                <!--证件号码-->
                <div class="bottom-row-div">
                  <div class="text-title">
                    证件号码
                  </div>
                  ：
                  <span class="id-card-style">{{ getPropertyFromKey('id.idCard') }}</span>
                </div>
                <!--标签-->
                <div
                  v-if="getPropertyFromKey('id.label')"
                  class="bottom-row-div"
                >
                  <p-label
                    :labels="getPropertyFromKey('id.label')"
                    :limit="2"
                    :is-row="true"
                  />
                </div>
                <!--布控名称-->
                <div class="bottom-row-div">
                  <div class="text-title">
                    布控名称
                  </div>
                  ：
                  <span>{{ getPropertyFromKey('id.taskName') }}</span>
                </div>
                <!--抓拍时间-->
                <div class="bottom-row-div">
                  <div class="text-title">
                    抓拍时间
                  </div>
                  ：
                  <span>{{ getPropertyFromKey('capture.captureTime') }}</span>
                </div>
                <!--抓拍地点-->
                <div class="bottom-row-div">
                  <div class="text-title">
                    抓拍地点
                  </div>
                  ：
                  <span>{{ getPropertyFromKey('capture.deviceName') }}</span>
                </div>
                <!--操作区域-->
                <div class="bottom-row-div">
                  <span
                    class="action-btn-style btn-red"
                    :class="{'not-allowed':isActionNotAllowed}"
                    @click="handleTaskStatus(3)"
                  >误报</span>
                  <span
                    class="action-btn-style btn-normal"
                    :class="{'not-allowed':isActionNotAllowed}"
                    @click="handleTaskStatus(2)"
                  >签阅</span>
                </div>
              </div>
            </div>
            <div
              v-show="isLog"
              class="log-div"
            >
              <!--表格区域-->
              <div class="table-div">
                <el-table
                  :data="logData.list"
                  height="100%"
                >
                  <!--是否机动车-->
                  <el-table-column
                    label="是否机动车"
                    width="90"
                    align="center"
                    fixed
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.isMotor }}</span>
                    </template>
                  </el-table-column>
                  <!--是否戴头盔-->
                  <el-table-column
                    label="是否戴头盔"
                    width="90"
                    align="center"
                    fixed
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.isHelmet }}</span>
                    </template>
                  </el-table-column>
                  <!--确认人-->
                  <el-table-column
                    label="确认人"
                    prop="confirmPeople"
                    align="center"
                  />
                  <!--时间-->
                  <el-table-column
                    label="时间"
                    prop="time"
                    width="160"
                    align="center"
                  />
                </el-table>
              </div>
              <!--分页区域-->
              <div class="page-div">
                <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="logData.total"
                />
              </div>
            </div>
          </div>
          <!--模式二，包含人脸和全景图-->
          <div
            v-if="componentType === 2"
            class="normal-right-div"
          >
            <div>
              抓拍时间：
              <span>{{ lodash.get(currentInfo, 'capture.captureTime') }}</span>
            </div>
            <div>
              抓拍地点：
              <span
                v-if="lodash.get(currentInfo, 'capture.deviceName')"
                class="no-warp-style"
                :title="currentInfo.capture.deviceName"
              >
                {{ currentInfo.capture.deviceName }}
              </span>
            </div>
          </div>
          <!--模式三，只包含证件照-->
          <div
            v-if="componentType === 3"
            class="normal-right-div"
          >
            <div class="column-style-div">
              <div class="special-pos-style">
                <span>{{ lodash.get(currentInfo, 'id.personName') }}</span>
                <span>{{ lodash.get(currentInfo, 'id.sex') }}</span>
              </div>
              <div v-if="lodash.get(currentInfo, 'id.idCard')">
                <span class="id-card-style">
                  {{ lodash.get(currentInfo, 'id.idCard') }}
                </span>
              </div>
              <div>
                学校：
                <span>{{ lodash.get(currentInfo, 'id.schoolDeviceNum') }}点位-</span>
                <span>{{ lodash.get(currentInfo, 'id.schoolCaptureDay') }}天-</span>
                <span>{{ lodash.get(currentInfo, 'id.schoolCaptureTimes') }}次</span>
              </div>
              <div>
                首次：
                <span>{{ lodash.get(currentInfo, 'id.firstCaptureTime') }}</span>
              </div>
              <div>
                最近：
                <span>{{ lodash.get(currentInfo, 'id.recentCaptureTime') }}</span>
              </div>
            </div>
          </div>
          <!--模式四，只包含全景图-->
          <div
            v-if="componentType === 4"
            class="normal-right-div"
          >
            <div>
              <span>{{ lodash.get(currentInfo, 'capture.captureTime') }}</span>
            </div>
            <div>
              <span
                v-if="lodash.get(currentInfo, 'capture.deviceName')"
                class="no-warp-style"
                :title="currentInfo.capture.deviceName"
              >
                {{ lodash.get(currentInfo, 'capture.deviceName') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--个性化中间定制-->
      <div
        v-if="isConfirm"
        slot="middle"
        class="big-pic-middle"
      >
        <div
          v-show="!isLog"
          class="confirm-div-style"
        >
          <!--单选框区域-->
          <el-radio-group v-model="confirmFlag">
            <el-radio :label="0">
              待确认
            </el-radio>
            <el-radio :label="1">
              同一人
            </el-radio>
            <el-radio :label="2">
              不同人
            </el-radio>
          </el-radio-group>
          <!--按钮-->
          <span class="btn-style btn-blue">确认</span>
          <!--查看确认日志-->
          <span
            class="special-color"
            @click="openLog()"
          >确认日志</span>
        </div>
        <div
          v-show="isLog"
          class="close-log-div"
        >
          <span
            class="red-color-style"
            @click="closeLog()"
          >关闭确认日志</span>
        </div>
      </div>
      <!--底部-->
      <div
        slot="footer"
        class="big-pic-bottom"
      >
        <i
          class="icon-direction icon-left"
          :class="{'active':currentPage !== 0}"
          @click="preGroup()"
        />
        <!--图片缩略图-->
        <div class="bottom-pic-box">
          <div
            v-for="(item,key) in thumbnailPicData"
            :key="key"
            class="pic-box"
            :class="{'active': thumbnailPicStatus(key)}"
            @click="changeCurrentIndex(key)"
          >
            <pic-adaption
              :src="thumbnailPicSrc(item)"
              :error-img="errorPic"
            />
          </div>
        </div>
        <!--图片索引-->
        <span class="show-text-index-div">
          {{ currentIndex + 1 }}/{{ dialogData.length }}
        </span>
        <i
          class="icon-direction icon-right"
          :class="{'active': getActiveRightFlag }"
          @click="nextGroup()"
        />
      </div>
    </common-box>
  </div>
</template>

<script>
const componentOne = 1;//第一种类型（包含确认日志等信息）
const componentTwo = 2;//第二种类型（包含全景图和人脸图）
const componentThree = 3;//第三种类型（只包含证件照）
const componentFour = 4;//第四种类型（只包含证件照）
const componentFive = 5;//第五种类型（在第一种类型的情况下，多出误报、签阅按钮）

import commonBox from './common-box.vue'; //大图弹窗骨架
import picAdaption from '../pic-adaption.vue'; //图片自适应组件
import pLabel from '../person-label.vue';
import errorImg from './images/no-data.png';
import errorPic from './images/no-pic.png';
import errorInfo from './images/no-info.png';
import _ from 'lodash';

export default {
  name: 'DetailViewDialog',
  components:{
    commonBox,
    picAdaption,
    pLabel
  },
  props:{
    visible:{
      type:Boolean,
      default:true
    },
    //组件类型，用于控制大图的组件
    componentType:{
      type:Number,
      default:componentOne
    },
    //是否开启确认同一人功能
    isConfirm:{
      type:Boolean,
      default:false
    },
    //大图数据
    /**
     * {
          'scene': {'src': 'http://35.48.105.154:8762/image-service/urlImage/getImageByUrl?imageUrl=background/35029973001320000590/201912/20191224/350299730013200005900220191224073349495420614001.jpg'},
          'capture': {
            'src': 'http://35.48.105.154:8762/image-service/urlImage/getImageByUrl?imageUrl=face/35029973001320000590/201912/20191224/350299730013200005900220191224073349495420614001.jpg',
            'deviceName': '湖里区BRT集美大桥南站西侧入口',
            'captureTime': '2019-12-24 07:33:49',
            'similarity': 77.05628
          },
          'id': {
            'personName': '马先美',
            'idCard': '350205197312160025',
            'src': 'http://35.48.105.154:8762/bigdata-human-service/person/image?ryid=D00T002R20170505171509219018',
            'label': ['重点|精神']
          }
        }
     **/
    dialogData:{
      type:Array,
      default:() => {
        return [];
      }
    },
    picCurrentIndex:{
      type:Number,
      default:0
    },
  },
  data(){
    return{
      lodash: _,
      dialogBoxShow:false,
      errorImg,
      errorPic, //错误图片
      errorInfo, //错误信息
      currentPicType:'scene',
      currentIndex:0, //当前图片索引
      currentPage:0, //当前图片所在的页数
      confirmFlag:0,
      isLog:false, //是否日志模式
      //日志数据
      logData:{
        list:[
          {
            isMotor:'是',
            isHelmet:'否',
            confirmPeople:'管理员',
            time:'2019-10-25 10:30:52'
          }
        ],
        total:50
      }
    };
  },
  computed:{
    /**
     * 当前图片类型
     */
    currentPicName(){
      let str = '';
      switch (this.currentPicType) {
      case 'scene':
        str = '全景图';
        break;
      case 'id':
        str = '证件照';
        break;
      case 'capture':
        str = '人脸图';
        break;
      case 'video':
        str = '视频';
        break;
      }
      return str;
    },
    firstPicType(){
      let str = '';
      switch (this.componentType){
      case componentOne:
        str = 'scene';
        break;
      case componentTwo:
        str = 'scene';
        break;
      case componentThree:
        str = 'id';
        break;
      case componentFour:
        str = 'scene';
        break;
      case componentFive:
        str = 'scene';
        break;
      }
      return str;
    },
    /**
     * 当前点击的图片信息
     */
    currentInfo(){
      return this.dialogData[this.currentIndex];
    },
    /**
     * 分割的大图数据
     */
    bigDataChunk(){
      return _.chunk(this.dialogData, 10);
    },
    /**
     * 缩略图数据
     */
    thumbnailPicData(){
      return this.bigDataChunk[this.currentPage];
    },
    //缩略图是否选中状态
    thumbnailPicStatus(){
      return (key) => {
        let flag = false;
        if (this.currentPage * 10 + key === this.currentIndex){
          flag = true;
        }
        return flag;
      };
    },
    /**
     * 获取下一组的样式
     */
    getActiveRightFlag(){
      let flag = false;
      let length = this.bigDataChunk.length;
      if (length && this.currentPage === (length - 1)) {
        flag = true;
      }
      return flag;
    },
    /**
     * 当前主区域的图片src
     */
    currentMainPicSrc(){
      return _.get(this.currentInfo, `[${this.currentPicType}].src`, null);
    },
    /**
     * 是否不允许信息操作样式
     */
    isActionNotAllowed(){
      let result = false;
      if (Number(this.getPropertyFromKey('capture.taskStatus')) === 2 || Number(this.getPropertyFromKey('capture.taskStatus')) === 3){
        result = true;
      }
      return result;
    },
  },
  watch:{
    visible:{
      handler(val){
        this.dialogBoxShow = val;
        setTimeout(()=>{
          if(!val) return;
          this.changeCurrentPagePage();
        });
      },
      immediate:true
    },
    // 当前是选中第几张
    picCurrentIndex:{
      handler(val){
        this.currentIndex = val;
      },
      immediate:true
    }
  },
  mounted(){
    //初始化图片类型
    this.currentPicType = this.firstPicType;
  },
  methods:{
    /**
     * 改变当前图片索引
     * @param index 图片索引
     */
    changeCurrentIndex(index){
      this.currentIndex = this.currentPage * 10 + index;
      this.currentPicType = this.firstPicType;
    },
    /**
     * 上一组
     */
    preGroup(){
      if (this.currentPage > 0){
        this.currentPage --;
      }
    },
    /**
     * 下一组
     */
    nextGroup(){
      if (this.currentPage < (this.bigDataChunk.length - 1)){
        this.currentPage ++;
      }
    },
    /**
     * 改变当前图片所在的页数
     *
     * */
    changeCurrentPagePage(){
      //当传入数组长度为0时，直接返回 --- 当打开时点击的图片在下一页时自动翻页
      const CurrentPageLength = 10; //当前列表中展示几张缩略图片
      const CurrentPage = Math.ceil((this.currentIndex + 1) / CurrentPageLength) - 1; //当前图片在第几页

      this.currentPage = CurrentPage;
    },
    /**
     * 改变图片类型
     * @param key 图片类型
     */
    changePicType(key){
      this.currentPicType = key;
    },
    /**
     * 打开日志
     */
    openLog(){
      this.isLog = true;
    },
    /**
     * 关闭日志
     */
    closeLog(){
      this.isLog = false;
    },
    //关闭窗口
    closeWindow() {
      this.$emit('update:visible', false);
    },
    /**
     * 人员标签
     */
    dealPersonLabels() {
      if (this.currentInfo && this.currentInfo.id && this.currentInfo.id.label) {
        return this.currentInfo.id.label.join(',');
      }
    },
    /**
     * 根据关键字获取属性值
     * @param key 关键字
     * @param defaultValue 默认值
     */
    getPropertyFromKey(key, defaultValue){
      let val = _.get(this.currentInfo, key, defaultValue || '');
      if(val && key === 'id.label' && typeof val === 'object'){
        val = val.join(',');
      }
      return val;
    },
    /**
     * 处理任务的状态
     * @param val 状态值  2签阅 3误报
     */
    handleTaskStatus(val){
      let index = this.currentPage * 10 + this.currentIndex;
      this.$emit('handleTaskStatus', index, val);
    },

    /**
     * 缩略图地址
     */
    thumbnailPicSrc(item){
      if ([componentOne, componentTwo, componentFour, componentFive ].includes(this.componentType)) {
        return _.get(item, 'capture.src', null);
      }
      if ([componentThree ].includes(this.componentType)) {
        return _.get(item, 'id.src', null);
      }
    },
  }
};
</script>

<style scoped lang="less">
  @import "./detail-view-dialog";
</style>

