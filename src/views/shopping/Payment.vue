<!-- 选择支付方式 -->
<template>
  <div class="payment">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go('-1')"
      :fixed="false"
      title="收银台"
    />
    <div class="contentBox">
      <div>
        <p>订单提交成功;请您尽快付款</p>
        <p>
          订单号: <span>{{ $route.query.tradeNo }}</span>
        </p>
        <p>收款方: <span>开心兔商城</span></p>
        <p>
          订单金额: <span>{{ $route.query.money }}</span>
        </p>
      </div>
      <div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="微信支付" clickable @click="radio = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
            <!-- <van-cell title="单选框 2" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell> -->
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="btnBox">
        <van-button @click="onPay">确认支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 0,
    };
  },
  mounted() {
    // console.info(this.$route.query);
  },
  methods: {
    // app支付
    onPay: function () {
      let this_ = this;
      var wxChannel = null; // 微信支付
      var aliChannel = null; // 支付宝支付
      //获取支付通道
      plus.payment.getChannels(
        function (channels) {
          for (var i in channels) {
            if (channels[i].id == "wxpay") {
              wxChannel = channels[i];
              this_.requestPay(wxChannel);
              // alert(JSON.stringify(wxChannel))
              return;
            }
            //  else {
            //   aliChannel = channels[i];
            //   this_.requestPay(aliChannel);
            //   console.info(2)
            // }
          }
        },
        function (e) {
          alert("获取支付通道失败：" + e.message);
        }
      );
    },
    requestPay: function (wxChannel) {
      this.axios
        .post(this.$api.pay, {
          tradeNo: this.$route.query.tradeNo,
          payType: 0,
          platform: 2,
        })
        .then((data) => {
          if (data.code == 200) {
            let obj = data.data
            obj.sign = obj.paySign;
            delete obj.paySign; //true
            plus.payment.request(
              wxChannel,
              obj,
              function (result) {
                plus.nativeUI.alert(
                  "支付成功!",
                  function () {
                    mui.back();
                  },
                  "充值"
                );
              },
              function (e) {
                // plus.nativeUI.alert(
                //   "更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html",
                //   null,
                //   "支付失败：" + e.code
                // );
                plus.nativeUI.alert(JSON.stringify(e));
              }
            );
            // this.$router.push("/shopping");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
  },
};
</script>
<style scoped>
.payment {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.contentBox {
  flex: 1;
  position: relative;
  background-color: #f6f6f6;
}
.contentBox > div {
  background: #fff;
  margin-bottom: 1rem;
}
.contentBox > div:nth-child(1) {
  padding-top: 0.5rem;
}
.contentBox > div:nth-child(1) > p {
  line-height: 2.4rem;
  text-indent: 1rem;
}
.contentBox > div:nth-child(1) > p > span {
  padding-left: 0.8rem;
}
.btnBox {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 0 !important;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #f6f6f6 !important;
}
.btnBox > button {
  width: 100%;
  color: #fff;
  border-radius: 5px;
  background: linear-gradient(to right, #ffc474, #ff855a);
}
</style>