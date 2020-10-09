<template>
  <div class="my-container">
    <van-cell-group  class="my-info">
      <van-cell title="单元格" value="内容" center class="base-info" :border="false" >
        <van-image class="avator" slot="icon" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div slot="title" class="name">昵称</div>
        <van-button  class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="文字" />
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="文字" />
    </van-grid>
    <van-cell title="消息通知" is-link url="/" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="退出登入"   to="/" />
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset ;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avator {
        width: 66px;
        height: 66px;
        border: 1px solid #fff ;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        color: green;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666  ;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
}
</style>
