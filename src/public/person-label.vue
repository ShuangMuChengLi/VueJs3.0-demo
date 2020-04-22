<template>
  <div
    :title="labels"
    class="label-item"
    :class="{'label-item-row':isRow}"
  >
    <div
      v-for="(item,index) in labelData"
      :key="index"
      class="msg-tab"
      :class="item.class"
    >
      <div v-if="index < count">
        <span class="tab-lf">{{ item.lf }}</span>
        <span class="tab-lr">{{ item.rt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');
export default {
  name: 'PersonLabel',
  props: {
    labels: {
      type: String,
      default: null
    },
    single: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    isRow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      count: 99,
      classType: [
        { name: '部恐', value: 1 },
        { name: '重点', value: 2 },
        { name: '国', value: 3 },
        { name: '经', value: 4 },
        { name: '治', value: 5 },
        { name: '恐', value: 6 },
        { name: '禁', value: 7 },
        { name: '网', value: 8 },
        { name: '刑', value: 9 }
      ],
      labelData: [],
      label: {}
    };
  },
  watch: {
    labels: 'init'
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      let labelArr = [];
      if (this.labels) {
        labelArr = this.labels.split(',');// 把获取到的参数储存到数组中
        this.count = labelArr.length;
        if (this.single) {
          this.count = 1;
        }
        if (this.limit) {
          this.count = this.limit;
        }
        const labelData = [];
        for (let i = 0; i < this.count; i++) {
          if (!labelArr[i]) {
            continue;
          }

          const dataArray = labelArr[i].split('|');
          const item = {
            lf: dataArray[0] || '',
            rt: dataArray[1] || ''
          };
          const index = _.findIndex(this.classType, { name: item.lf });
          if (index === -1) {
            item.class = 'theme-5';
          } else {
            item.class = 'theme-' + this.classType[index].value;
          }

          labelData.push(item);
        }
        this.labelData = labelData;
      }
    }
  }
};
</script>

<style scoped lang="less">
    .label-item {
        overflow: hidden;
        height: 31px;
    }
    .label-item-row{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .msg-tab {
        display: inline-block;
        border-radius: 40px;
        margin: 3px 4px;
        height: 23px;
        width: 103px;
        text-align: left;
      &>div{
        display: flex;
        flex-direction: row;
      }
    }

    .msg-tab .tab-lf {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        height: 24px;
        line-height: 24px;
        color: #FFF;
        width: 36px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 17px;
        vertical-align: middle;
        text-align: center;
    }

    .msg-tab .tab-lr {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px 0;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        vertical-align: middle;
        width: 60px;
    }

    .msg-tab .tab-tri {
        display: block;
        width: 14px;
        margin-left: -4px;
        font-size: 14px;
        line-height: 28px;
        float: left;
    }

    .theme-1 {
        border: 1px solid #d92220;
    }

    .theme-1 .tab-lf {
        background: #d92220;
    }

    .theme-1 .tab-tri,
    .theme-1 .tab-lr {
        color: #d92220;
    }

    .theme-2 {
        border: 1px solid #ea742d;
    }

    .theme-2 .tab-lf {
        background: #ea742d;
    }

    .theme-2 .tab-tri,
    .theme-2 .tab-lr {
        color: #ea742d;
    }

    .theme-3 {
        border: 1px solid #bb7878;
    }

    .theme-3 .tab-lf {
        background: #bb7878;
    }

    .theme-3 .tab-tri,
    .theme-3 .tab-lr {
        color: #bb7878;
    }

    .theme-4 {
        border: 1px solid #599a64;
    }

    .theme-4 .tab-lf {
        background: #599a64;
    }

    .theme-4 .tab-tri,
    .theme-4 .tab-lr {
        color: #599a64;
    }

    .theme-5 {
        border: 1px solid #24ab9a;
    }

    .theme-5 .tab-lf {
        background: #24ab9a;
    }

    .theme-5 .tab-tri,
    .theme-5 .tab-lr {
        color: #24ab9a;
    }

    .theme-6 {
        border: 1px solid #dd575c;
    }

    .theme-6 .tab-lf {
        background: #dd575c;
    }

    .theme-6 .tab-tri,
    .theme-6 .tab-lr {
        color: #dd575c;
    }

    .theme-7 {
        border: 1px solid #6873c7;
    }

    .theme-7 .tab-lf,
    .theme-7 .tab-tri {
        background: #6873c7;
    }

    .theme-7 .tab-lr {
        color: #6873c7;
    }

    .theme-8 {
        border: 1px solid #30a7df;
    }

    .theme-8 .tab-lf {
        background: #30a7df;
    }

    .theme-8 .tab-tri,
    .theme-8 .tab-lr {
        color: #30a7df;
    }

    .theme-9 {
        border: 1px solid #5c96e0;
    }

    .theme-9 .tab-lf {
        background: #5c96e0;
    }

    .theme-9 .tab-tri,
    .theme-9 .tab-lr {
        color: #5c96e0;
    }

    .theme-10 {
        border: 1px solid #12a7c2;
    }

    .theme-10 .tab-lf {
        background: #12a7c2;
    }

    .theme-10 .tab-tri,
    .theme-10 .tab-lr {
        color: #12a7c2;
    }
    @media screen and (min-width: 2500px){
        .msg-tab{
            width: 154.5px;
            height: 34.5px;
        }
        .tab-lf{
            font-size: 21px;
        }
        .tab-lr{
            width: 90px;
            line-height: 30px;
            font-size: 21px;
        }
        .msg-tab .tab-lf{
            font-size: 21px;
            height: 40.5px;
            line-height: 40.5px;
            width: 54px;
        }
        .msg-tab .tab-lr{
            font-size: 21px;
        }
    }
</style>
