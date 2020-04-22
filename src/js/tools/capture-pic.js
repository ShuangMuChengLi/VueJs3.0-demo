let video;
let canvas;
let context;
let videoStream;
export class CapturePic {
  /**
   * @param options
   * {
        // videoId : 'video', // 展示的videoId 可选  不填默认不显示
        // width: 200, // 图像宽 可选 默认摄像头像素宽
        // height: 100 // 图像高 可选 默认摄像头像素高
      }
   */
  constructor (options) {
    if (options && options.videoId) {
      video = document.getElementById(options.videoId);
    } else {
      video = document.createElement('video');
    }

    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      // 调用用户媒体设备, 访问摄像头
      this.getUserMedia({
        video: {
          width: (options && options.width) || null,
          height: (options && options.height) || null
        }
      }, (stream) => { this.getPhotoSuccess(stream); }, (error) => { this.getPhotoFailure(error); });
    } else {
      this.isSuport = false;
      console.error('不支持访问用户媒体');
    }
  }

  getPhotoSuccess (stream) {
    this.isSuport = true;
    videoStream = stream;
    // video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
    video.addEventListener('loadedmetadata', function (e) {
      canvas.width = e.target.videoWidth;
      canvas.height = e.target.videoHeight;
    });
  }

  // 访问用户媒体设备的兼容方法
  getUserMedia (constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
      // 最新的标准API
      navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
      // webkit核心浏览器
      navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
      // firfox浏览器
      navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      // 旧版API
      navigator.getUserMedia(constraints, success, error);
    }
  }

  getPhotoFailure (error) {
    this.isSuport = false;
    console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
  }

  capture () {
    context.drawImage(video, 0, 0);
    return this;
  }

  isSuportTest () {
    return this.isSuport;
  }

  getBase64 (isReplaceHeader = false) {
    var picBase64 = canvas.toDataURL('image/jpg');
    if (isReplaceHeader) {
      picBase64 = picBase64.replace(/^data:image\/(png|jpg);base64,/, '');
    }
    return picBase64;
  }

  stop () {
    videoStream.getTracks().forEach(
      function (track) {
        track.stop();
      }
    );
  }
}
