<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 使用vant组件验证 -->
    <!-- 登录表单 -->
    <van-form @submit="onLogin">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        label="手机号"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        label="验证码"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button
            class="send-btn"
            size="mini"
            round
          >发送验证码</van-button>
        </template>
      </van-field>
    <div class="login-btn-wrap" >
      <van-button class="login-btn" type="info" block >登录</van-button>
    </div>
    <!-- /登录表单 -->
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          { pattern: /^1[3,5,7,8,9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        this.$toast.success('登入成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
          this.$toast.fail('登入失败，手机号或者验证码错误')
        }
      }
    }
  }
}

</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
