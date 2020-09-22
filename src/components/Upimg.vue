<!-- 上传图片 -->
<template>
  <div class="upimg">
    <van-uploader v-model="fileList" multiple  :after-read="afterRead" :max-size="1048576" :max-count="9" :before-read="beforeRead" @oversize="handleMaxSize" />
    <div class="btnbox">
      <van-button type="primary" @click="addimg">确认上传</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        // { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image" },
      ],
    };
  },
  methods: {
    afterRead: function (file) {
      let this_ = this;
      // 此时可以自行将文件上传至服务器
      // this.addimg(file.file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      //创建xhr，使用ajax进行文件上传
      let xhr = new XMLHttpRequest();
      xhr.withCredentialstrue = true;
      xhr.open("post", this.$api.baseUrl + this.$api.uploadFixImg);
      // 处理成功
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let data = JSON.parse(xhr.response);
          file.content = data.data.path;
        }
      };
      //将formdata上传
      xhr.send(formdata);
    },
    // 上传不符合条件
    handleMaxSize: function () {
      this.$toast("文件大小超过1M!");
    },
    // 格式验证 需要返回布尔值
    beforeRead: function (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        this.$toast("请上传jpeg,jpg,png 格式图片");
        return false;
      }
      return true;
    },
    // 确定提交
    addimg: function () {
      if (this.fileList.length == 0) {
        this.$toast("没有上传图片");
      } else {
        this.$emit("addupimg", this.fileList);
      }
    },
  },
};
</script>

<style scoped>
.upimg {
  height: 100%;
  padding: 0.5rem;
}
.btnbox {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}
.btnbox > button {
  color: #fff;
  border-radius: 5rem;
  background-color: #feb35c;
  border: 1px solid #feb35c;
}
</style>