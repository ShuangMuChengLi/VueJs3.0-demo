<template>
  <div class="left-menu-wrapper">
    <ul>
      <li class="first-menu-item-wrapper">
        <div
          v-for="(item,index) in menuList"
          :key="'menuList' + index"
          class="first-menu-item"
        >
          <i
            class="first-menu-item-i"
            :class="item.icon"
          />
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RkLeftMenu',
  data(){
    return {
      menuList:[
        {
          name:'首页',
          icon:'el-icon-s-home'
        },
        {
          name:'颜色',
          icon:'el-icon-s-home'
        },
        {
          name:'系统管理',
          icon:'el-icon-s-tools'
        },
      ]
    };
  }
};
</script>

<style scoped lang="less">
  @import "css/rk-left-menu.less";
</style>
