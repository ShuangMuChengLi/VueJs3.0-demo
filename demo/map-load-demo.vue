<template>
  <div class="wrapper">
    <div>
      <el-select
        v-model="areaId"
        @change="setMap"
      >
        <el-option
          v-for="item in areaSet"
          :key="item.value"
          :value="item.value"
          :label="item.labal"
        />
      </el-select>
    </div>
    <div
      id="map"
      class="map"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, XYZ, Vector as VectorSource, Cluster, TileArcGISRest} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';
export default {
  name: 'MapLoadDemo',
  data(){
    return {
      areaId: 'xiamenFromPoliceVideo',
      areaSet:[
        {
          value: 'chongqingFromJimeiVideo',
          labal: '重庆(集美视频网服务器）',
          urls: ['http://192.168.212.157:3000/mapGisCQ/mapImage?base=base&imgFormat=png&z={z}&x={x}&y={y}'],
          zoom: 13,
          center: [106.261435, 29.311821],
          mapType: OSM
        },
        {
          value: 'xiamenFromJimeiVideo',
          labal: '厦门(集美视频网服务器）',
          urls: [
            'http://192.168.212.157:3000/arcgis/rest/services/XMJM_2000/MapServer',
            'http://192.168.212.157:3000/arcgis/rest/services/XMMAP_CVA_C2000/MapServer', // 地名
          ],
          zoom: 13,
          center: [118.0934, 24.5418],
          mapType: TileArcGISRest
        },
        {
          value: 'xiamenSatelliteFromJimeiVideo',
          labal: '厦门卫星图(集美视频网服务器）',
          urls: [
            'http://192.168.212.157:3000/arcgis/rest/services/XMMAP_2000/MapServer',
            'http://192.168.212.157:3000/arcgis/rest/services/XMMAP_CVA_C2000/MapServer', // 地名
          ],
          zoom: 13,
          center: [118.0934, 24.5418],
          mapType: TileArcGISRest
        },
        {
          value: 'xiamenFromPoliceVideo',
          labal: '厦门(市局视频网服务器）',
          urls: ['http://35.48.98.202:7000/mapImageServer/showElecPic?imgFormat=png&x={x}&y={y}&z={z}'],
          zoom: 13,
          center: [118.0934, 24.5418],
          mapType: XYZ
        },
      ],
      mapObject:null,
      layers:[],
    };
  },
  computed:{
    area(){
      return _.find(this.areaSet, {value: this.areaId});
    }
  },
  mounted(){
    this.$emit('setCode', '/demo/map-load-demo.vue');
    this.$emit('setInfo', `<p>厦门、重庆地图瓦片加载 (demo/map-load-demo.vue)</p>
      <p>该demo瓦片在视频网环境下</p>
    `);
    this.initMap();
    this.setMap();
  },
  methods:{
    /**
     * 初始化地图
     */
    initMap() {
      let mapObject = new Map({
        target: 'map',
      });
      // 用RKMap加载地图，其他用原生开发
      this.mapObject = mapObject;
    },
    setMap(){
      if(this.layers.length > 0){
        for(let layer of this.layers){
          this.mapObject.removeLayer(layer);
        }
        this.layers = [];
      }
      for(let url of this.area.urls){
        let layer = new TileLayer({
          source: new this.area.mapType({
            url: url
          })
        });
        this.layers.push(layer);
        this.mapObject.addLayer(layer);
      }

      this.view = new View({
        center:this.area.center,
        zoom:this.area.zoom,
        minZoom : 9, // 最小缩放层级
        maxZoom: 19, // 最大缩放层级
        popupOffset: [0, 0], // 设置弹框偏移量
        projection: 'EPSG:4326',
      });
      this.mapObject.setView(this.view);
    }
  }

};
</script>

<style scoped lang="less">
  .wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
  .map{
    width: 100%;
    height: 100%;
  }
</style>
