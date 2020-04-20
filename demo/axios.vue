<template>
  <div>
    <ul>
      <li
        v-for="(item,key) in alarmInfoStatisticsByType"
        :key="key"
      >
        {{ item.alarmType }} - {{ item.alarmCount }}
      </li>
    </ul>
  </div>
</template>
<script>
import {axios} from '../src/js/tools/axios';
import {util} from '../src/js/tools/util';
import {api, JSONHeader} from '../config/api-config';
export default {
  components: {},
  data() {
    return {
      alarmInfoStatisticsByType:[]
    };
  },
  created() {

  },
  mounted() {
    this.postLocalJson();
    this.postLocalJsonContentTypeJSON();
    this.getLocalJson();
    this.deleteLocalJson();
    this.putLocalJson();
    this.patchLocalJson();
    this.$emit('setCode', '/demo/axios.vue');
    this.$emit('setInfo', `本地开发时，设置config.api_local请求本地json文件数据。接口联调时，设置config.api请求服务器接口数据。json文件及目录应与接口结构一致。
      <a download="restful前端对接说明.doc" href="/demoaxios-demo.doc">restful前端对接说明</a>
    `);
  },
  methods: {
    /**
     * get提交  content-type为form
     * @returns {Promise.<void>}
     */
    async getRemoteJson(){
      let result = await axios.get('/remove-api/users', {data:111}).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为form
     * @returns {Promise.<void>}
     */
    async postLocalJson(){
      let result = await axios.post(api.alarmInfo.alarmInfoStatisticsByType, {data:111}).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为JSON
     * @returns {Promise.<void>}
     */
    async postLocalJsonContentTypeJSON(){
      let result = await axios.post(api.alarmInfo.alarmInfoStatisticsByType, {data:111}, JSONHeader).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async getLocalJson(){
      let result = await axios.get(api.alarmInfo.alarmInfoStatisticsByType, {id :1}).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async deleteLocalJson(){
      let result = await axios.delete(api.alarmInfo.alarmInfoStatisticsByType).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async putLocalJson(){
      let result = await axios.put(api.alarmInfo.alarmInfoStatisticsByType, {data:111}).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async patchLocalJson(){
      let result = await axios.patch(api.alarmInfo.alarmInfoStatisticsByType, {data:111}).then((res)=>{
        let data = util.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
  }
};
</script>

<style scoped lang="less">

</style>
