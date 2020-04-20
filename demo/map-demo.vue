<template>
  <div class="wrapper">
    <div
      id="map"
      class="map"
    />
    <div class="tooltip">
      <el-button
        class="draw-button"
        type="success"
        @click="showCircle([119.3008804321289, 26.059913635253906])"
      >
        画圆(半径500米）
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="hideCircle()"
      >
        清除圆
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="addInteraction('Star')"
      >
        手动画图
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="drawLineHand()"
      >
        手动画线条
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="cancelDrawLineHand()"
      >
        取消手动画线条
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="drawLine()"
      >
        渲染线条
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="startAnimation()"
      >
        动画
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="cluster()"
      >
        聚合图层
      </el-button>
      <el-button
        class="draw-button"
        type="success"
        @click="getCenter()"
      >
        获取中心点
      </el-button>
    </div>
    <!-- Overlay 模板弹窗的集合，外层要加一个style="display: none"使得默认不显示 -->
    <div style="display: none">
      <p
        id="tip"
        class="tip"
      >
        {{ tip }}
      </p>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import {getDistance} from 'ol/sphere';
import View from 'ol/View';
import {OSM, Vector as VectorSource, XYZ, Cluster} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import {Point, Circle, Polygon, LineString} from 'ol/geom';
import Overlay from 'ol/Overlay';
import {transform} from 'ol/proj';
import {Style, Fill, Stroke, Circle as CircleStyle, Icon, Text} from 'ol/style';
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw';
import lineData from './data/line-data.json';
import {circular} from 'ol/geom/Polygon';
import videoImg from './img/ball-running.png';
import activeVideoImg from './img/ball-stop.png';
export default {
  name:'MapDemo',
  data() {
    return {
      vectorLayerList: [],
      mapObject: null,
      pointsList: [{'point':[119.3045711517334, 26.060256958007812], 'name':0}, {'point':[119.35881614685059, 26.061973571777344], 'name':1}, {'point':[119.31727409362793, 26.0540771484375], 'name':2}, {'point':[119.33684349060059, 26.028671264648438], 'name':3}, {'point':[119.35812950134277, 26.03485107421875], 'name':4}, {'point':[119.29530143737793, 26.06231689453125], 'name':5}, {'point':[119.26543235778809, 26.070213317871094], 'name':6}, {'point':[119.31487083435059, 26.0760498046875], 'name':7}, {'point':[119.30319786071777, 26.083602905273438], 'name':8}, {'point':[119.23761073035672, 26.062660217285156], 'name':9}, {'point':[119.23932734412625, 26.03931427001953], 'name':10}],
      textPointsList: [{'point':[119.29564476013184, 26.060256958007812], 'name':0}, {'point':[119.33993339538574, 26.058883666992188], 'name':1}, {'point':[119.33169364929199, 26.03862762451172], 'name':2}, {'point':[119.27229881286621, 26.047897338867188], 'name':3}, {'point':[119.23007011413574, 26.05682373046875], 'name':4}, {'point':[119.20844078063965, 26.059913635253906], 'name':5}, {'point':[119.28774833679199, 26.068153381347656], 'name':6}, {'point':[119.34988975524902, 26.065750122070312], 'name':7}, {'point':[119.33341026306152, 26.029701232910156], 'name':8}, {'point':[119.30766105651855, 26.03107452392578], 'name':9}, {'point':[119.27298545837402, 26.037940979003906], 'name':10}, {'point':[119.24002647399902, 26.05030059814453], 'name':11}, {'point':[119.2884349822998, 26.067123413085938], 'name':12}],
      activePointsList: [],
      drawSource: null,
      draw: null,
      drawVector: null,
      tip: '',
      overlaySet: {}, // overlay集合
      handDraw:null,
      now: null,
      speed: 60,
      geoMarker:null,
      animating:false,
      wgs84Sphere:null,
      center: [119.30122375488281, 26.066436767578125], //[-26924713.90236847, 2813379.48157834]
      clickPointSet:[]
    };
  },
  computed: {},
  watch: {},
  created: function () {
    this.$emit('setCode', '/demo/map-demo.vue');
    this.$emit('setInfo', `原生地图demo (demo/map-demo.vue)
      该demo瓦片在外网环境下，福州区域
    `);

  },
  mounted: function () {
    this.init();
  },
  methods: {
    /**
       * 页面初始化
       * */
    init() {
      this.initMap();
      this.initMapEvent();
      this.showLocationPoint();
    },
    /**
       * 初始化地图
       * */
    initMap() {

      this.drawSource = new VectorSource({
        wrapX: false,
      });

      this.drawVector = new VectorLayer({
        source: this.drawSource
      });
      this.markerSource = new VectorSource({
        wrapX: false,
      });

      this.markerVector = new VectorLayer({
        source: this.markerSource,
      });

      this.mapObject = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM({
              url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                  '?apikey=0e6fc415256d4fbb9b5166a718591d71'
            })
          }),
          this.drawVector,
          this.markerVector
        ],
        view: new View({
          center: this.center,
          zoom: 12,
          projection:'EPSG:4326'
        })
      });
    },
    formatLength(linePoints) {

      //定义长度变量
      // let length;
      // //如果大地测量复选框被勾选，则计算球面距离
      // if (geodesicCheckbox.checked) {
      //   //Return the coordinates of the linestring.
      //   //获取坐标串
      //   let coordinates = line.getCoordinates();
      //   //初始长度为0
      //   length = 0;
      //   //获取源数据的坐标系
      let sourceProj = this.mapObject.getView().getProjection();
      let length = 0;
      //进行点的坐标转换
      for (let i = 0; i < linePoints.length - 1; i++) {
        //第一个点
        let c1 = transform(linePoints[i], sourceProj, 'EPSG:4326');
        //第二个点
        let c2 = transform(linePoints[i + 1], sourceProj, 'EPSG:4326');
        //获取转换后的球面距离
        //Returns the distance from c1 to c2 using the haversine formula.
        length += getDistance(c1, c2);
      }
      console.log(length);
      this.$message.success(parseInt(length) + 'meter');
      // } else {
      //   //Return the length of the linestring on projected plane.
      //   //计算平面距离
      //   length = Math.round(line.getLength() * 100) / 100;
      // }
      // //定义输出变量
      // let output;
      // //如果长度大于1000，则使用km单位，否则使用m单位
      // if (length > 1000) {
      //   output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; //换算成KM单位
      // } else {
      //   output = (Math.round(length * 100) / 100) + ' ' + 'm'; //m为单位
      // }
      // return output;
    },
    /**
       * 初始化地图事件
       * */
    initMapEvent() {
      // 单击
      this.mapObject.on('click', this.mapObjectClick);
      // 悬浮
      this.mapObject.on('pointermove', this.mapObjectPointerMove);
    },
    /**
       * 悬浮
       */
    mapObjectPointerMove(evt) {
      if (this.mapObject.hasFeatureAtPixel(evt.pixel)) {
        this.mapObject.getTargetElement().style.cursor = 'pointer';
      } else {
        this.mapObject.getTargetElement().style.cursor = '';
      }

      let features = this.mapObject.getFeaturesAtPixel(evt.pixel);
      let coors = this.mapObject.getCoordinateFromPixel(evt.pixel);
      let flag = this.mapObject.hasFeatureAtPixel(evt.pixel);
      if (features && features.length) {
        let property = features[0].getProperties();
        if (property && property.name) {
          this.showTipModel(coors, property.name);
        }
      } else {
        this.hideModel('tip');
      }
    },
    /**
       * 隐藏地图人员弹窗
       *
       */
    hideModel(id) {
      this.mapObject.removeOverlay(this.overlaySet[id]);
    },
    /**
       * 显示属性标签
       * */
    showTipModel(coors, name) {
      this.tip = name;
      this.showModel({
        point: coors,
        type: 'tip'
      }, 'tip', false);
    },
    /**
       * 显示地图弹窗
       * option:{
          point:linePoint.point,坐标
        }
       id:弹窗ID
       isSetCenter:点位是否移动到地图中间
       */
    showModel(option, id, isSetCenter = true) {
      let currentOverlay = this.overlaySet[id];
      //overlay
      if (!currentOverlay) {
        currentOverlay = new Overlay({
          offset: [10, 0],
          element: document.getElementById(id),
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });
        this.overlaySet[id] = currentOverlay;
      }
      this.mapObject.addOverlay(currentOverlay);
      currentOverlay.setPosition(option.point);
      if (isSetCenter) {
        let size = (this.mapObject.getSize());
        let offsetHeight = 200;
        this.view.centerOn(option.point, size, [(size[0] / 2), (size[1] / 2) - offsetHeight]);
      }
    },
    /**
       * 显示点位
       * */
    showLocationPoint() {
      this.showVectorLayer('location');
      this.vectorLayerList['location'].setStyle(new Style({
        image: new Icon({
          src: videoImg,
          scale: 1,
        }),
      }));
      for (let point of this.pointsList) {
        let pointFeature = this.getPointFeature(point.point);
        pointFeature.setProperties(point);
        this.vectorLayerList['location'].getSource().addFeature(pointFeature);
        point.feature = pointFeature;
      }
    },
    /**
       * 显示重叠字体图标
       * */
    showTextPoint() {
      for (let point of this.textPointsList) {
        this.showVectorLayer('text' + point.name);
        let pointFeature = this.getTextPointFeature(point.point, point.name);
        pointFeature.setProperties(point);
        this.vectorLayerList['text' + point.name].getSource().addFeature(pointFeature);
        point.feature = pointFeature;
      }
    },
    /**
       * 渲染圆
       * */
    showCircle(coord) {
      this.showVectorLayer('circle');
      let circleFeature = this.getCircleFeature(coord, 500);
      this.vectorLayerList['circle'].getSource().addFeature(circleFeature);
      let geometry = circleFeature.getGeometry();
      this.showHightPoint(geometry);
    },
    /**
       * 隐藏圆
       *
       * */
    hideCircle(){
      this.hideVectorLayer('circle');
      for (let feature of this.activePointsList) {
        feature.setStyle(null);
      }
      this.activePointsList = [];
    },
    /**
       * 高亮显示点位
       * */
    showHightPoint(geometry) {
      for (let point of this.pointsList) {
        let isInside = geometry.intersectsCoordinate(point.point);
        if (isInside) {
          if(this.activePointsList.indexOf(point.feature) === -1){
            point.feature.setStyle(new Style({
              image: new Icon({
                src: activeVideoImg,
                scale: 1,
              }),
            }));
            this.activePointsList.push(point.feature);
          }
          console.log(this.activePointsList);
        }
      }
    },
    /**
       * 隐藏图层
       */
    hideVectorLayer(vectorId) {
      if (this.vectorLayerList[vectorId]) {
        let features = this.vectorLayerList[vectorId].getSource().getFeatures();
        for(let feature of features){
          this.vectorLayerList[vectorId].getSource().removeFeature(feature);
        }
      }
    },
    /**
       * 点击事件
       * */
    mapObjectClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      let features = this.mapObject.getFeaturesAtPixel(evt.pixel);
      let coors = this.mapObject.getCoordinateFromPixel(evt.pixel);
      this.clickPointSet.push({
        point:coors,
        name:this.clickPointSet.length
      });
      console.log(JSON.stringify(this.clickPointSet));
      let flag = this.mapObject.hasFeatureAtPixel(evt.pixel);
    },
    /**
       * 获取点位图标
       * point:[x,y]
       * return:Feature
       * */
    getPointFeature(point) {
      let pointGeo = new Point(point);
      let pointFeature = new Feature({
        geometry: pointGeo,
        name: 'point'
      });
      return pointFeature;
    },
    /**
       * 获取字体点位图标
       * point:[x,y]
       * return:Feature
       * */
    getTextPointFeature(point, text) {
      let pointGeo = new Point(point);
      let pointFeature = new Feature({
        geometry: pointGeo,
        name: 'point'
      });
      pointFeature.setStyle(new Style({
        image: new Icon({
          src: videoImg,
          scale: 1,
        }),
        text:new Text({
          font:'normal 19px Microsoft Yahei',
          text,
          fill:new Fill({
            color:'#000'
          })
        })
      }));
      return pointFeature;
    },
    /**
       * 获取圆形Feature
       * point:[x,y]
       * return:Feature
       * */
    getCircleFeature(point, radius) {
      let pointGeo = new circular(point, radius, 64);
      let feature = new Feature({
        geometry: pointGeo,
        name: 'circle'
      });
      feature.setStyle(new Style({
        fill: new Fill({
          color: 'rgba(230,135,23,0.5)'
        }),
        stroke: new Stroke({
          color: '#e68717'
        })
      }));
      return feature;
    },
    /**
       * 显示图层
       * */
    showVectorLayer(type) {
      let oVectorLayer = this.vectorLayerList[type];
      if (oVectorLayer) {
        // 已有了该图层  则显示
        oVectorLayer.setVisible(true);
        return;
      }
      // 没有该图层   创建图层
      oVectorLayer = this.createVectorLayer();
      this.vectorLayerList[type] = oVectorLayer;
      this.mapObject.addLayer(this.vectorLayerList[type]);
    },
    /**
       * 创建VectorLayer
       * */
    createVectorLayer() {
      let oVectorSource = new VectorSource();
      let oVectorLayer = new VectorLayer({
        source: oVectorSource
      });
      return oVectorLayer;
    },
    /**
       * 画图形
       * @param value
       */
    addInteraction(value) {
      if (value === 'None') {
        this.draw.finishDrawing();
        this.mapObject.removeInteraction(this.draw);
        return;
      }
      let geometryFunction;
      if (value === 'Square') {
        value = 'Circle';
        geometryFunction = createRegularPolygon(4);
      } else if (value === 'Box') {
        value = 'Circle';
        geometryFunction = createBox();
      } else if (value === 'Star') {
        value = 'Circle';
        geometryFunction = function (coordinates, geometry) {
          let center = coordinates[0];
          let last = coordinates[1];
          let dx = center[0] - last[0];
          let dy = center[1] - last[1];
          let radius = Math.sqrt(dx * dx + dy * dy);
          let rotation = Math.atan2(dy, dx);
          let newCoordinates = [];
          let numPoints = 12;
          for (let i = 0; i < numPoints; ++i) {
            let angle = rotation + i * 2 * Math.PI / numPoints;
            let fraction;
            if(i % 2 === 0){
              fraction = 1;
            }else{
              fraction = 0.5;
            }
            let offsetX = radius * fraction * Math.cos(angle);
            let offsetY = radius * fraction * Math.sin(angle);
            newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
          }
          newCoordinates.push(newCoordinates[0].slice());
          if (!geometry) {
            geometry = new Polygon([newCoordinates]);
          } else {
            geometry.setCoordinates([newCoordinates]);
          }
          return geometry;
        };
      }
      this.draw = new Draw({
        source: this.drawSource,
        type: value,
        geometryFunction: geometryFunction
      });
      this.mapObject.addInteraction(this.draw);
      this.draw.on('drawend', (event) => {
        let geo = event.feature.getGeometry();
        this.showHightPoint(geo);
      });
    },
    /**
       * 手动划线
       * */
    drawLineHand(){
      this.handDraw = new Draw({
        source: this.drawSource,
        type: 'LineString',
        freehand: true
      });
      this.handDraw.on('drawend', (event) => {
        let geo = event.feature.getGeometry();
        let linePoints = geo.getCoordinates();
        console.log(JSON.stringify(linePoints));
        this.formatLength(linePoints);
      });
      this.mapObject.addInteraction(this.handDraw);
    },
    cancelDrawLineHand(){
      this.mapObject.removeInteraction(this.handDraw);
    },
    drawCar(){

      const styles = {
        'route': new Style({
          stroke: new Stroke({
            width: 6, color: [237, 212, 0, 0.8]
          })
        }),
        'icon': new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'data/icon.png'
          })
        }),
        'geoMarker': new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
              color: 'white', width: 2
            })
          })
        })
      };
      this.geoMarker = new Feature({
        type: 'geoMarker',
        geometry: new Point(lineData[0])
      });
      this.markerSource.addFeature(this.geoMarker);
      this.markerVector.setStyle((feature) =>{
        // hide geoMarker if animation is active
        if (this.animating && feature.get('type') === 'geoMarker') {
          return null;
        }
        return styles[feature.get('type')];
      });
    },
    /**
       * 渲染线
       * */
    drawLine(){
      let lineFeature = this.createLineFeature(lineData);
      var a = [];
      a = lineFeature.getGeometry().getCoordinateAt(0.5);
      // for (var i=0; i<=a.length; i++) {
      //   console.log("x: " + a[i].x + ",y: " + a[i].y);
      // }
      console.log(a);
      this.drawSource.addFeature(lineFeature);
    },
    /**
       * 停止动画
       * @param {boolean} ended end of animation.
       */
    stopAnimation(ended) {
      this.animating = false;
      let coord;
      if(ended){
        coord = lineData[lineData.length - 1];
      }else{
        coord = lineData[0];
      }
      const geometry = /** @type {import("../src/ol/geom/Point").default} */ (this.geoMarker.getGeometry());
      geometry.setCoordinates(coord);
      console.log(coord);
      //remove listener
      this.mapObject.un('postrender', this.moveFeature);
    },
    /**
       * postcompose动画事件
       * */
    moveFeature (event) {
      const vectorContext = event.vectorContext;
      const frameState = event.frameState;
      if (!this.animating) {
        this.mapObject.render();
        return;
      }
      const elapsedTime = frameState.time - this.now;
      // here the trick to increase speed is to jump some indexes
      // on lineString coordinates
      const index = Math.round(this.speed * elapsedTime / 1000);
      if (index >= lineData.length) {
        this.stopAnimation(true);
        return;
      }
      let coord = lineData[index];
      this.hideVectorLayer('circle');
      this.showCircle(coord);
      const currentPoint = new Point(coord);
      const feature = new Feature(currentPoint);
      vectorContext.drawFeature(feature, new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({color: 'black'}),
          stroke: new Stroke({
            color: 'white', width: 2
          })
        })
      }));
      // tell OpenLayers to continue the postrender animation
      this.mapObject.render();
    },
    /**
       * 开始动画
       * */
    startAnimation(){
      if(this.animating){
        this.stopAnimation(false);
        return;
      }

      this.showLocationPoint();
      this.drawLine();
      this.drawCar();
      this.animating = true;
      this.now = new Date().getTime();
      this.geoMarker.setStyle(null);
      // just in case you pan somewhere else
      // this.mapObject.getView().setCenter([-472202, 7530279]);
      this.mapObject.on('postcompose', (event)=>{
        this.moveFeature(event);
      });
      this.mapObject.render();
    },
    /**
       * 创建线路Feature
       * @param linePoints 线路点位数组
       * @param styleOption 样式
       * */
    createLineFeature(linePoints, styleOption, text){
      return new Feature({
        geometry: new LineString(linePoints)
      });
    },
    cluster(){
      const features = new Array(this.textPointsList.length);

      for (let i = 0; i < this.textPointsList.length; ++i) {
        features[i] = new Feature(new Point(this.textPointsList[i].point));
      }
      const source = new VectorSource({
        features: features
      });
      const clusterSource = new Cluster({
        distance:50,
        source: source
      });
      const styleCache = {};
      const clusters = new VectorLayer({
        source: clusterSource,
        style: function(feature) {
          const size = feature.get('features').length;
          let style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: '#fff'
                }),
                fill: new Fill({
                  color: '#3399CC'
                })
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: '#fff'
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      });
      console.log(clusters);
      this.mapObject.addLayer(clusters);
    },
    getCenter(){
      let center = this.mapObject.getView().getCenter();
      console.log(center);
      this.$message.success(JSON.stringify(center));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .draw-button {

  }

  .tooltip {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .tip {
    background-color: #deeffe;
    display: inline-block;
    padding: 0 10px;
    border: #2584dd 1px solid;
    font-size: 14px;
    color: #000;
    border-radius: 3px;
  }
</style>
